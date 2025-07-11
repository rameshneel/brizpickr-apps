#!/bin/bash

# Rollback Script for BrizPickr Applications
# Handles rollbacks for both Vercel and VPS deployments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APPS=("customer-dashboard" "vendor-portal" "super-admin" "internal-crm" "landing-page")
ENVIRONMENTS=("staging" "production")
DEPLOYMENT_TYPES=("vercel" "vps")

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -a, --app <app-name>        Rollback specific app"
    echo "  -e, --env <environment>     Rollback specific environment"
    echo "  -t, --type <deployment>     Deployment type (vercel/vps)"
    echo "  -v, --version <version>     Rollback to specific version"
    echo "  -l, --list                  List available versions"
    echo "  -f, --force                 Force rollback without confirmation"
    echo "  -h, --help                  Show this help"
    echo ""
    echo "Available apps:"
    for app in "${APPS[@]}"; do
        echo "  - $app"
    done
    echo ""
    echo "Available environments:"
    for env in "${ENVIRONMENTS[@]}"; do
        echo "  - $env"
    done
    echo ""
    echo "Available deployment types:"
    for type in "${DEPLOYMENT_TYPES[@]}"; do
        echo "  - $type"
    done
    echo ""
    echo "Examples:"
    echo "  $0 -a customer-dashboard -e production -t vercel"
    echo "  $0 -a vendor-portal -e staging -t vps -v v1.2.0"
    echo "  $0 -a all -e production -t vercel -l"
}

# Function to confirm rollback
confirm_rollback() {
    local app_name=$1
    local environment=$2
    local deployment_type=$3
    local version=$4
    
    echo ""
    print_warning "⚠️  ROLLBACK CONFIRMATION ⚠️"
    echo "This will rollback:"
    echo "  App: $app_name"
    echo "  Environment: $environment"
    echo "  Deployment Type: $deployment_type"
    if [[ -n "$version" ]]; then
        echo "  Version: $version"
    else
        echo "  Version: Previous version"
    fi
    echo ""
    echo "This action cannot be undone!"
    echo ""
    
    read -p "Are you sure you want to proceed? (yes/no): " confirmation
    
    if [[ "$confirmation" != "yes" ]]; then
        print_status "Rollback cancelled"
        exit 0
    fi
}

# Function to list Vercel deployments
list_vercel_deployments() {
    local app_name=$1
    local environment=$2
    
    print_status "Listing Vercel deployments for $app_name ($environment)..."
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        return 1
    }
    
    # List deployments
    vercel ls --limit 10
    
    # Return to root directory
    cd ../..
}

# Function to rollback Vercel deployment
rollback_vercel() {
    local app_name=$1
    local environment=$2
    local version=$3
    local force=$4
    
    print_status "Rolling back Vercel deployment for $app_name ($environment)..."
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        return 1
    }
    
    # Perform rollback
    if [[ -n "$version" ]]; then
        print_status "Rolling back to version: $version"
        vercel rollback "$version"
    else
        print_status "Rolling back to previous version"
        vercel rollback
    fi
    
    print_success "Vercel rollback completed for $app_name"
    
    # Return to root directory
    cd ../..
}

# Function to list VPS versions
list_vps_versions() {
    local app_name=$1
    local environment=$2
    
    print_status "Listing VPS versions for $app_name ($environment)..."
    
    # Check if backup directory exists
    local backup_dir="/var/backups/brizpickr/$app_name/$environment"
    
    if [[ ! -d "$backup_dir" ]]; then
        print_warning "No backup directory found: $backup_dir"
        return 1
    fi
    
    # List available versions
    echo "Available versions:"
    ls -la "$backup_dir" | grep -E "^d" | awk '{print $9}' | sort -r
    
    return 0
}

# Function to rollback VPS deployment
rollback_vps() {
    local app_name=$1
    local environment=$2
    local version=$3
    local force=$4
    
    print_status "Rolling back VPS deployment for $app_name ($environment)..."
    
    # Determine backup directory
    local backup_dir="/var/backups/brizpickr/$app_name/$environment"
    local app_dir="/var/www/$app_name"
    
    if [[ ! -d "$backup_dir" ]]; then
        print_error "Backup directory not found: $backup_dir"
        return 1
    fi
    
    # Determine version to rollback to
    local target_version=""
    if [[ -n "$version" ]]; then
        target_version="$version"
    else
        # Get the most recent backup
        target_version=$(ls -t "$backup_dir" | head -n 1)
    fi
    
    if [[ -z "$target_version" ]]; then
        print_error "No backup versions found"
        return 1
    fi
    
    local backup_path="$backup_dir/$target_version"
    
    if [[ ! -d "$backup_path" ]]; then
        print_error "Backup version not found: $target_version"
        return 1
    fi
    
    print_status "Rolling back to version: $target_version"
    
    # Create backup of current version
    local current_backup="$backup_dir/rollback-$(date +%Y%m%d-%H%M%S)"
    if [[ -d "$app_dir" ]]; then
        print_status "Creating backup of current version..."
        sudo cp -r "$app_dir" "$current_backup"
    fi
    
    # Restore from backup
    print_status "Restoring from backup..."
    sudo rm -rf "$app_dir"
    sudo cp -r "$backup_path" "$app_dir"
    
    # Set proper permissions
    sudo chown -R www-data:www-data "$app_dir"
    sudo chmod -R 755 "$app_dir"
    
    # Restart nginx
    print_status "Restarting nginx..."
    sudo systemctl restart nginx
    
    print_success "VPS rollback completed for $app_name to version $target_version"
}

# Function to rollback single app
rollback_single_app() {
    local app_name=$1
    local environment=$2
    local deployment_type=$3
    local version=$4
    local force=$5
    
    print_status "Rolling back $app_name ($environment) on $deployment_type..."
    
    case $deployment_type in
        "vercel")
            rollback_vercel "$app_name" "$environment" "$version" "$force"
            ;;
        "vps")
            rollback_vps "$app_name" "$environment" "$version" "$force"
            ;;
        *)
            print_error "Unknown deployment type: $deployment_type"
            return 1
            ;;
    esac
}

# Function to rollback all apps
rollback_all_apps() {
    local environment=$1
    local deployment_type=$2
    local version=$3
    local force=$4
    
    print_status "Rolling back all apps in $environment on $deployment_type..."
    
    local failed_rollbacks=0
    
    for app in "${APPS[@]}"; do
        if rollback_single_app "$app" "$environment" "$deployment_type" "$version" "$force"; then
            print_success "$app rollback completed"
        else
            print_error "$app rollback failed"
            ((failed_rollbacks++))
        fi
    done
    
    if [[ $failed_rollbacks -eq 0 ]]; then
        print_success "All apps rolled back successfully"
        return 0
    else
        print_error "$failed_rollbacks app(s) failed to rollback"
        return $failed_rollbacks
    fi
}

# Function to run health checks after rollback
run_post_rollback_checks() {
    local app_name=$1
    local environment=$2
    
    print_status "Running post-rollback health checks for $app_name..."
    
    # Wait for deployment to stabilize
    sleep 30
    
    # Run health check
    if ./infrastructure/scripts/health-check.sh -a "$app_name" -e "$environment"; then
        print_success "Health checks passed after rollback"
        return 0
    else
        print_warning "Health checks failed after rollback"
        return 1
    fi
}

# Main execution
main() {
    local app_name=""
    local environment=""
    local deployment_type=""
    local version=""
    local list_versions=false
    local force=false
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -a|--app)
                app_name="$2"
                shift 2
                ;;
            -e|--env)
                environment="$2"
                shift 2
                ;;
            -t|--type)
                deployment_type="$2"
                shift 2
                ;;
            -v|--version)
                version="$2"
                shift 2
                ;;
            -l|--list)
                list_versions=true
                shift
                ;;
            -f|--force)
                force=true
                shift
                ;;
            -h|--help)
                show_usage
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    # Validate required parameters
    if [[ -z "$environment" ]]; then
        print_error "Environment is required"
        show_usage
        exit 1
    fi
    
    if [[ -z "$deployment_type" ]]; then
        print_error "Deployment type is required"
        show_usage
        exit 1
    fi
    
    # Validate inputs
    if [[ -n "$app_name" && "$app_name" != "all" ]]; then
        local valid_app=false
        for app in "${APPS[@]}"; do
            if [[ "$app" == "$app_name" ]]; then
                valid_app=true
                break
            fi
        done
        
        if [[ "$valid_app" == false ]]; then
            print_error "Invalid app name: $app_name"
            show_usage
            exit 1
        fi
    fi
    
    local valid_env=false
    for env in "${ENVIRONMENTS[@]}"; do
        if [[ "$env" == "$environment" ]]; then
            valid_env=true
            break
        fi
    done
    
    if [[ "$valid_env" == false ]]; then
        print_error "Invalid environment: $environment"
        show_usage
        exit 1
    fi
    
    local valid_type=false
    for type in "${DEPLOYMENT_TYPES[@]}"; do
        if [[ "$type" == "$deployment_type" ]]; then
            valid_type=true
            break
        fi
    done
    
    if [[ "$valid_type" == false ]]; then
        print_error "Invalid deployment type: $deployment_type"
        show_usage
        exit 1
    fi
    
    # Execute based on parameters
    if [[ "$list_versions" == true ]]; then
        if [[ "$app_name" == "all" ]]; then
            for app in "${APPS[@]}"; do
                if [[ "$deployment_type" == "vercel" ]]; then
                    list_vercel_deployments "$app" "$environment"
                else
                    list_vps_versions "$app" "$environment"
                fi
            done
        else
            if [[ "$deployment_type" == "vercel" ]]; then
                list_vercel_deployments "$app_name" "$environment"
            else
                list_vps_versions "$app_name" "$environment"
            fi
        fi
    else
        # Confirm rollback unless forced
        if [[ "$force" != true ]]; then
            confirm_rollback "$app_name" "$environment" "$deployment_type" "$version"
        fi
        
        # Perform rollback
        if [[ "$app_name" == "all" ]]; then
            rollback_all_apps "$environment" "$deployment_type" "$version" "$force"
        else
            rollback_single_app "$app_name" "$environment" "$deployment_type" "$version" "$force"
            
            # Run health checks
            run_post_rollback_checks "$app_name" "$environment"
        fi
    fi
}

# Execute main function with all arguments
main "$@" 
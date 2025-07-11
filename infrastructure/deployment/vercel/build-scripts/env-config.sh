#!/bin/bash

# Environment Configuration Script for BrizPickr
# Manages environment variables for different deployment environments

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENTS=("development" "staging" "production")
APPS=("customer-dashboard" "vendor-portal" "super-admin" "internal-crm" "landing-page")

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
    echo "  -a, --app <app-name>        Configure specific app"
    echo "  -e, --env <environment>     Configure specific environment"
    echo "  -s, --set <key=value>       Set environment variable"
    echo "  -g, --get <key>             Get environment variable"
    echo "  -l, --list                  List all environment variables"
    echo "  -r, --remove <key>          Remove environment variable"
    echo "  -f, --file <file>           Load variables from file"
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
    echo "Examples:"
    echo "  $0 -a customer-dashboard -e production -l"
    echo "  $0 -a vendor-portal -e staging -s API_URL=https://api.staging.com"
    echo "  $0 -a all -e production -f .env.production"
}

# Function to validate environment
validate_environment() {
    local env=$1
    
    for valid_env in "${ENVIRONMENTS[@]}"; do
        if [[ "$env" == "$valid_env" ]]; then
            return 0
        fi
    done
    
    return 1
}

# Function to validate app
validate_app() {
    local app=$1
    
    if [[ "$app" == "all" ]]; then
        return 0
    fi
    
    for valid_app in "${APPS[@]}"; do
        if [[ "$app" == "$valid_app" ]]; then
            return 0
        fi
    done
    
    return 1
}

# Function to get Vercel project ID
get_vercel_project_id() {
    local app_name=$1
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        return 1
    }
    
    # Get project ID from vercel.json or .vercel/project.json
    local project_id=""
    
    if [[ -f ".vercel/project.json" ]]; then
        project_id=$(cat .vercel/project.json | grep -o '"projectId":"[^"]*"' | cut -d'"' -f4)
    fi
    
    # Return to root directory
    cd ../..
    
    echo "$project_id"
}

# Function to list environment variables
list_env_vars() {
    local app_name=$1
    local environment=$2
    
    print_status "Listing environment variables for $app_name ($environment)..."
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        return 1
    }
    
    # List environment variables using Vercel CLI
    vercel env ls
    
    # Return to root directory
    cd ../..
}

# Function to set environment variable
set_env_var() {
    local app_name=$1
    local environment=$2
    local key_value=$3
    
    # Parse key=value
    local key=$(echo "$key_value" | cut -d'=' -f1)
    local value=$(echo "$key_value" | cut -d'=' -f2-)
    
    if [[ -z "$key" || -z "$value" ]]; then
        print_error "Invalid key=value format: $key_value"
        return 1
    fi
    
    print_status "Setting $key for $app_name ($environment)..."
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        return 1
    }
    
    # Set environment variable using Vercel CLI
    echo "$value" | vercel env add "$key" "$environment"
    
    print_success "Environment variable $key set successfully"
    
    # Return to root directory
    cd ../..
}

# Function to get environment variable
get_env_var() {
    local app_name=$1
    local environment=$2
    local key=$3
    
    print_status "Getting $key for $app_name ($environment)..."
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        return 1
    }
    
    # Get environment variable using Vercel CLI
    vercel env pull .env.local
    if [[ -f ".env.local" ]]; then
        grep "^$key=" .env.local | cut -d'=' -f2-
        rm .env.local
    fi
    
    # Return to root directory
    cd ../..
}

# Function to remove environment variable
remove_env_var() {
    local app_name=$1
    local environment=$2
    local key=$3
    
    print_status "Removing $key for $app_name ($environment)..."
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        return 1
    }
    
    # Remove environment variable using Vercel CLI
    vercel env rm "$key" "$environment" --yes
    
    print_success "Environment variable $key removed successfully"
    
    # Return to root directory
    cd ../..
}

# Function to load environment variables from file
load_env_file() {
    local app_name=$1
    local environment=$2
    local file_path=$3
    
    if [[ ! -f "$file_path" ]]; then
        print_error "Environment file not found: $file_path"
        return 1
    fi
    
    print_status "Loading environment variables from $file_path for $app_name ($environment)..."
    
    # Read file line by line
    while IFS= read -r line; do
        # Skip empty lines and comments
        if [[ -n "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
            # Check if line contains key=value
            if [[ "$line" =~ ^[^=]+=.* ]]; then
                set_env_var "$app_name" "$environment" "$line"
            else
                print_warning "Skipping invalid line: $line"
            fi
        fi
    done < "$file_path"
    
    print_success "Environment variables loaded from $file_path"
}

# Function to configure all apps
configure_all_apps() {
    local environment=$1
    local operation=$2
    local value=$3
    
    print_status "Configuring all apps for $environment environment..."
    
    local failed_configs=0
    
    for app in "${APPS[@]}"; do
        print_status "Configuring $app..."
        
        case $operation in
            "list")
                list_env_vars "$app" "$environment"
                ;;
            "set")
                set_env_var "$app" "$environment" "$value"
                ;;
            "get")
                get_env_var "$app" "$environment" "$value"
                ;;
            "remove")
                remove_env_var "$app" "$environment" "$value"
                ;;
            "load")
                load_env_file "$app" "$environment" "$value"
                ;;
        esac
        
        if [[ $? -ne 0 ]]; then
            ((failed_configs++))
        fi
    done
    
    if [[ $failed_configs -eq 0 ]]; then
        print_success "All apps configured successfully"
        return 0
    else
        print_error "$failed_configs app(s) failed to configure"
        return $failed_configs
    fi
}

# Function to create environment template
create_env_template() {
    local environment=$1
    local template_file=".env.$environment.template"
    
    print_status "Creating environment template for $environment..."
    
    cat > "$template_file" << EOF
# Environment Configuration for $environment
# Copy this file to .env.$environment and fill in the actual values

# API Configuration
VITE_API_URL=https://api.$environment.brizpickr.com
VITE_API_VERSION=v1

# Authentication
VITE_AUTH_DOMAIN=auth.$environment.brizpickr.com
VITE_AUTH_CLIENT_ID=your_client_id_here

# Analytics
VITE_ANALYTICS_ID=your_analytics_id_here
VITE_ANALYTICS_ENABLED=true

# Feature Flags
VITE_FEATURE_NEW_UI=false
VITE_FEATURE_BETA_FEATURES=false

# External Services
VITE_STRIPE_PUBLIC_KEY=your_stripe_key_here
VITE_SENTRY_DSN=your_sentry_dsn_here

# App Configuration
VITE_APP_NAME=BrizPickr
VITE_APP_ENV=$environment
VITE_APP_VERSION=\${APP_VERSION:-1.0.0}

# Development Only (remove in production)
VITE_DEBUG_MODE=false
VITE_MOCK_API=false
EOF
    
    print_success "Environment template created: $template_file"
}

# Main execution
main() {
    local app_name=""
    local environment=""
    local operation=""
    local value=""
    local create_template=false
    
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
            -s|--set)
                operation="set"
                value="$2"
                shift 2
                ;;
            -g|--get)
                operation="get"
                value="$2"
                shift 2
                ;;
            -l|--list)
                operation="list"
                shift
                ;;
            -r|--remove)
                operation="remove"
                value="$2"
                shift 2
                ;;
            -f|--file)
                operation="load"
                value="$2"
                shift 2
                ;;
            --create-template)
                create_template=true
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
    
    if ! validate_environment "$environment"; then
        print_error "Invalid environment: $environment"
        show_usage
        exit 1
    fi
    
    if [[ -n "$app_name" && ! validate_app "$app_name" ]]; then
        print_error "Invalid app name: $app_name"
        show_usage
        exit 1
    fi
    
    # Create template if requested
    if [[ "$create_template" == true ]]; then
        create_env_template "$environment"
        exit 0
    fi
    
    # Execute operation
    if [[ -n "$operation" ]]; then
        if [[ "$app_name" == "all" ]]; then
            configure_all_apps "$environment" "$operation" "$value"
        else
            case $operation in
                "list")
                    list_env_vars "$app_name" "$environment"
                    ;;
                "set")
                    set_env_var "$app_name" "$environment" "$value"
                    ;;
                "get")
                    get_env_var "$app_name" "$environment" "$value"
                    ;;
                "remove")
                    remove_env_var "$app_name" "$environment" "$value"
                    ;;
                "load")
                    load_env_file "$app_name" "$environment" "$value"
                    ;;
            esac
        fi
    else
        print_error "No operation specified"
        show_usage
        exit 1
    fi
}

# Execute main function with all arguments
main "$@" 
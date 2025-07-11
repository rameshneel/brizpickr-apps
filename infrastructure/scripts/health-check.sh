#!/bin/bash

# Health Check Script for BrizPickr Applications
# Monitors application health across different environments

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
    echo "  -a, --app <app-name>     Check specific app"
    echo "  -e, --env <environment>  Check specific environment"
    echo "  -u, --url <url>          Check specific URL"
    echo "  -t, --timeout <seconds>  Request timeout (default: 10)"
    echo "  -v, --verbose            Verbose output"
    echo "  -h, --help               Show this help"
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
    echo "  $0                                    # Check all apps in all environments"
    echo "  $0 -a customer-dashboard             # Check customer dashboard in all environments"
    echo "  $0 -a customer-dashboard -e staging  # Check customer dashboard in staging"
    echo "  $0 -u https://app.example.com/health # Check specific URL"
}

# Function to check URL health
check_url_health() {
    local url=$1
    local timeout=${2:-10}
    local verbose=$3
    
    if [[ "$verbose" == "true" ]]; then
        print_status "Checking: $url"
    fi
    
    # Check if URL is accessible
    if curl -f -s --max-time "$timeout" "$url" > /dev/null 2>&1; then
        # Get response time
        response_time=$(curl -w "%{time_total}" -s --max-time "$timeout" -o /dev/null "$url")
        
        # Get HTTP status code
        status_code=$(curl -w "%{http_code}" -s --max-time "$timeout" -o /dev/null "$url")
        
        if [[ "$status_code" == "200" ]]; then
            print_success "$url - OK (${response_time}s)"
            return 0
        else
            print_warning "$url - Status: $status_code (${response_time}s)"
            return 1
        fi
    else
        print_error "$url - FAILED"
        return 1
    fi
}

# Function to check app health
check_app_health() {
    local app_name=$1
    local environment=$2
    local timeout=${3:-10}
    local verbose=$4
    
    local base_url=""
    
    # Determine base URL based on environment
    if [[ "$environment" == "production" ]]; then
        base_url="https://$app_name.brizpickr.com"
    else
        base_url="https://$app_name-staging.brizpickr.com"
    fi
    
    # Check main health endpoint
    local health_url="$base_url/health"
    local main_url="$base_url"
    
    print_status "Checking $app_name ($environment)..."
    
    # Check health endpoint
    if check_url_health "$health_url" "$timeout" "$verbose"; then
        # Check main page
        if check_url_health "$main_url" "$timeout" "$verbose"; then
            print_success "$app_name ($environment) - All checks passed"
            return 0
        else
            print_warning "$app_name ($environment) - Main page failed"
            return 1
        fi
    else
        print_error "$app_name ($environment) - Health check failed"
        return 1
    fi
}

# Function to check all apps
check_all_apps() {
    local environment=$1
    local timeout=${2:-10}
    local verbose=$3
    
    local total_checks=0
    local passed_checks=0
    local failed_checks=0
    
    print_status "Checking all apps in $environment environment..."
    
    for app in "${APPS[@]}"; do
        if check_app_health "$app" "$environment" "$timeout" "$verbose"; then
            ((passed_checks++))
        else
            ((failed_checks++))
        fi
        ((total_checks++))
    done
    
    echo ""
    print_status "Summary for $environment:"
    print_status "Total checks: $total_checks"
    print_success "Passed: $passed_checks"
    if [[ $failed_checks -gt 0 ]]; then
        print_error "Failed: $failed_checks"
    fi
    
    return $failed_checks
}

# Function to check all environments
check_all_environments() {
    local timeout=${1:-10}
    local verbose=$2
    
    local total_failures=0
    
    for env in "${ENVIRONMENTS[@]}"; do
        echo ""
        if check_all_apps "$env" "$timeout" "$verbose"; then
            print_success "$env environment: All checks passed"
        else
            print_error "$env environment: Some checks failed"
            ((total_failures++))
        fi
    done
    
    echo ""
    print_status "Overall Summary:"
    if [[ $total_failures -eq 0 ]]; then
        print_success "All environments healthy"
        return 0
    else
        print_error "$total_failures environment(s) have issues"
        return $total_failures
    fi
}

# Function to perform detailed health check
detailed_health_check() {
    local url=$1
    local timeout=${2:-10}
    
    print_status "Performing detailed health check for: $url"
    
    # Check basic connectivity
    if ! curl -f -s --max-time "$timeout" "$url" > /dev/null 2>&1; then
        print_error "Basic connectivity failed"
        return 1
    fi
    
    # Get detailed response
    local response=$(curl -s --max-time "$timeout" "$url")
    local status_code=$(curl -w "%{http_code}" -s --max-time "$timeout" -o /dev/null "$url")
    local response_time=$(curl -w "%{time_total}" -s --max-time "$timeout" -o /dev/null "$url")
    local content_type=$(curl -w "%{content_type}" -s --max-time "$timeout" -o /dev/null "$url")
    
    echo "Status Code: $status_code"
    echo "Response Time: ${response_time}s"
    echo "Content Type: $content_type"
    echo "Response: $response"
    
    return 0
}

# Main execution
main() {
    local app_name=""
    local environment=""
    local specific_url=""
    local timeout=10
    local verbose=false
    
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
            -u|--url)
                specific_url="$2"
                shift 2
                ;;
            -t|--timeout)
                timeout="$2"
                shift 2
                ;;
            -v|--verbose)
                verbose=true
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
    
    # Validate inputs
    if [[ -n "$app_name" ]]; then
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
    
    if [[ -n "$environment" ]]; then
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
    fi
    
    # Execute health checks based on parameters
    if [[ -n "$specific_url" ]]; then
        # Check specific URL
        if [[ "$verbose" == "true" ]]; then
            detailed_health_check "$specific_url" "$timeout"
        else
            check_url_health "$specific_url" "$timeout" "$verbose"
        fi
    elif [[ -n "$app_name" && -n "$environment" ]]; then
        # Check specific app in specific environment
        check_app_health "$app_name" "$environment" "$timeout" "$verbose"
    elif [[ -n "$app_name" ]]; then
        # Check specific app in all environments
        for env in "${ENVIRONMENTS[@]}"; do
            check_app_health "$app_name" "$env" "$timeout" "$verbose"
        done
    elif [[ -n "$environment" ]]; then
        # Check all apps in specific environment
        check_all_apps "$environment" "$timeout" "$verbose"
    else
        # Check all apps in all environments
        check_all_environments "$timeout" "$verbose"
    fi
}

# Execute main function with all arguments
main "$@" 
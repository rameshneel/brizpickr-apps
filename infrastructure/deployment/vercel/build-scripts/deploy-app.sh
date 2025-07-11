#!/bin/bash

# Vercel Deployment Script for BrizPickr Apps
# Usage: ./deploy-app.sh <app-name> <environment>

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
    echo "Usage: $0 <app-name> <environment>"
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
    echo "  $0 customer-dashboard staging"
    echo "  $0 vendor-portal production"
    echo "  $0 all staging"
}

# Function to validate inputs
validate_inputs() {
    local app_name=$1
    local environment=$2
    
    # Check if app name is valid
    if [[ "$app_name" != "all" ]]; then
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
    
    # Check if environment is valid
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
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI is not installed. Please install it first:"
        echo "npm i -g vercel"
        exit 1
    fi
    
    # Check if logged in to Vercel
    if ! vercel whoami &> /dev/null; then
        print_error "Not logged in to Vercel. Please login first:"
        echo "vercel login"
        exit 1
    fi
    
    print_success "Prerequisites check passed"
}

# Function to deploy single app
deploy_single_app() {
    local app_name=$1
    local environment=$2
    
    print_status "Deploying $app_name to $environment..."
    
    # Navigate to app directory
    cd "apps/$app_name" || {
        print_error "App directory not found: apps/$app_name"
        exit 1
    }
    
    # Set environment variables
    export VITE_APP_ENV=$environment
    
    # Deploy based on environment
    if [[ "$environment" == "production" ]]; then
        print_status "Deploying to production..."
        vercel --prod --yes
    else
        print_status "Deploying to staging..."
        vercel --yes
    fi
    
    print_success "$app_name deployed successfully to $environment"
    
    # Return to root directory
    cd ../..
}

# Function to deploy all apps
deploy_all_apps() {
    local environment=$1
    
    print_status "Deploying all apps to $environment..."
    
    for app in "${APPS[@]}"; do
        print_status "Deploying $app..."
        deploy_single_app "$app" "$environment"
    done
    
    print_success "All apps deployed successfully to $environment"
}

# Function to run health checks
run_health_checks() {
    local app_name=$1
    local environment=$2
    
    print_status "Running health checks for $app_name..."
    
    # Get deployment URL (this would need to be customized based on your domain structure)
    local base_url=""
    if [[ "$environment" == "production" ]]; then
        base_url="https://$app_name.brizpickr.com"
    else
        base_url="https://$app_name-staging.brizpickr.com"
    fi
    
    # Wait for deployment to be ready
    print_status "Waiting for deployment to be ready..."
    sleep 30
    
    # Check health endpoint
    if curl -f "$base_url/health" &> /dev/null; then
        print_success "Health check passed for $app_name"
    else
        print_warning "Health check failed for $app_name"
    fi
}

# Function to cleanup
cleanup() {
    print_status "Cleaning up..."
    # Add any cleanup tasks here
    print_success "Cleanup completed"
}

# Main execution
main() {
    local app_name=$1
    local environment=$2
    
    # Show usage if no arguments provided
    if [[ $# -eq 0 ]]; then
        show_usage
        exit 1
    fi
    
    # Validate inputs
    validate_inputs "$app_name" "$environment"
    
    # Check prerequisites
    check_prerequisites
    
    # Start deployment
    print_status "Starting deployment process..."
    print_status "App: $app_name"
    print_status "Environment: $environment"
    
    # Deploy based on app selection
    if [[ "$app_name" == "all" ]]; then
        deploy_all_apps "$environment"
    else
        deploy_single_app "$app_name" "$environment"
        run_health_checks "$app_name" "$environment"
    fi
    
    # Cleanup
    cleanup
    
    print_success "Deployment completed successfully!"
}

# Trap to handle errors
trap 'print_error "Deployment failed. Please check the logs above."; exit 1' ERR

# Execute main function with all arguments
main "$@" 
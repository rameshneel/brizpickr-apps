#!/bin/bash

# BrizPickr Deployment Script
# Usage: ./deploy.sh [environment] [app]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENTS=("staging" "production")
APPS=("customer-dashboard" "vendor-portal" "super-admin-dashboard" "internal-crm" "landing-page")
DOCKER_REGISTRY="brizpickr"
AWS_REGION="us-east-1"

# Default values
ENVIRONMENT=${1:-"staging"}
APP=${2:-"all"}

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Validate environment
validate_environment() {
    if [[ ! " ${ENVIRONMENTS[@]} " =~ " ${ENVIRONMENT} " ]]; then
        log_error "Invalid environment: $ENVIRONMENT"
        log_info "Valid environments: ${ENVIRONMENTS[*]}"
        exit 1
    fi
}

# Validate app
validate_app() {
    if [[ "$APP" != "all" ]] && [[ ! " ${APPS[@]} " =~ " ${APP} " ]]; then
        log_error "Invalid app: $APP"
        log_info "Valid apps: ${APPS[*]} or 'all'"
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        log_error "Docker is not running"
        exit 1
    fi
    
    # Check if kubectl is installed
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed"
        exit 1
    fi
    
    # Check if AWS CLI is installed
    if ! command -v aws &> /dev/null; then
        log_error "AWS CLI is not installed"
        exit 1
    fi
    
    # Check AWS credentials
    if ! aws sts get-caller-identity &> /dev/null; then
        log_error "AWS credentials not configured"
        exit 1
    fi
    
    log_success "Prerequisites check passed"
}

# Build Docker images
build_images() {
    log_info "Building Docker images for environment: $ENVIRONMENT"
    
    if [[ "$APP" == "all" ]]; then
        for app in "${APPS[@]}"; do
            build_single_image "$app"
        done
    else
        build_single_image "$APP"
    fi
}

build_single_image() {
    local app=$1
    local tag="$DOCKER_REGISTRY/$app:$ENVIRONMENT-$(git rev-parse --short HEAD)"
    
    log_info "Building $app..."
    
    # Build the image
    docker build \
        -t "$tag" \
        -f "infrastructure/docker/$app/Dockerfile" \
        --build-arg NODE_ENV=$ENVIRONMENT \
        .
    
    log_success "Built $app: $tag"
}

# Push Docker images
push_images() {
    log_info "Pushing Docker images to registry..."
    
    # Login to ECR
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $DOCKER_REGISTRY
    
    if [[ "$APP" == "all" ]]; then
        for app in "${APPS[@]}"; do
            push_single_image "$app"
        done
    else
        push_single_image "$APP"
    fi
}

push_single_image() {
    local app=$1
    local tag="$DOCKER_REGISTRY/$app:$ENVIRONMENT-$(git rev-parse --short HEAD)"
    
    log_info "Pushing $app..."
    docker push "$tag"
    log_success "Pushed $app: $tag"
}

# Deploy to Kubernetes
deploy_to_kubernetes() {
    log_info "Deploying to Kubernetes cluster: $ENVIRONMENT"
    
    # Set kubectl context
    kubectl config use-context "$ENVIRONMENT-cluster"
    
    if [[ "$APP" == "all" ]]; then
        for app in "${APPS[@]}"; do
            deploy_single_app "$app"
        done
    else
        deploy_single_app "$APP"
    fi
}

deploy_single_app() {
    local app=$1
    local image_tag="$DOCKER_REGISTRY/$app:$ENVIRONMENT-$(git rev-parse --short HEAD)"
    
    log_info "Deploying $app..."
    
    # Update the deployment with new image
    kubectl set image deployment/$app $app=$image_tag -n brizpickr-$ENVIRONMENT
    
    # Wait for rollout to complete
    kubectl rollout status deployment/$app -n brizpickr-$ENVIRONMENT --timeout=300s
    
    log_success "Deployed $app successfully"
}

# Run smoke tests
run_smoke_tests() {
    log_info "Running smoke tests..."
    
    # Get the service URL
    local service_url=""
    if [[ "$ENVIRONMENT" == "staging" ]]; then
        service_url="https://customer-staging.brizpickr.com"
    else
        service_url="https://customer.brizpickr.com"
    fi
    
    # Wait for service to be ready
    log_info "Waiting for service to be ready..."
    for i in {1..30}; do
        if curl -f "$service_url/health" > /dev/null 2>&1; then
            log_success "Service is ready"
            break
        fi
        if [[ $i -eq 30 ]]; then
            log_error "Service failed to become ready"
            exit 1
        fi
        sleep 10
    done
    
    # Run basic smoke tests
    log_info "Running basic smoke tests..."
    
    # Test health endpoint
    if ! curl -f "$service_url/health" > /dev/null 2>&1; then
        log_error "Health check failed"
        exit 1
    fi
    
    # Test main page loads
    if ! curl -f "$service_url" > /dev/null 2>&1; then
        log_error "Main page failed to load"
        exit 1
    fi
    
    log_success "Smoke tests passed"
}

# Run E2E tests
run_e2e_tests() {
    log_info "Running E2E tests..."
    
    # Set environment variables for tests
    export TEST_ENVIRONMENT=$ENVIRONMENT
    
    # Run E2E tests
    npx nx run-many --target=e2e --all --configuration=$ENVIRONMENT
    
    log_success "E2E tests completed"
}

# Monitor deployment
monitor_deployment() {
    log_info "Monitoring deployment..."
    
    # Check pod status
    kubectl get pods -n brizpickr-$ENVIRONMENT -l environment=$ENVIRONMENT
    
    # Check service endpoints
    kubectl get endpoints -n brizpickr-$ENVIRONMENT
    
    # Check ingress
    kubectl get ingress -n brizpickr-$ENVIRONMENT
    
    log_success "Deployment monitoring completed"
}

# Send notifications
send_notifications() {
    log_info "Sending deployment notifications..."
    
    local message=""
    if [[ "$APP" == "all" ]]; then
        message="🚀 All apps deployed successfully to $ENVIRONMENT environment"
    else
        message="🚀 $APP deployed successfully to $ENVIRONMENT environment"
    fi
    
    # Send to Slack (if configured)
    if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$message\"}" \
            "$SLACK_WEBHOOK_URL"
    fi
    
    # Send email notification (if configured)
    if [[ -n "$EMAIL_RECIPIENTS" ]]; then
        echo "$message" | mail -s "Deployment Notification" $EMAIL_RECIPIENTS
    fi
    
    log_success "Notifications sent"
}

# Rollback function
rollback() {
    log_warning "Rolling back deployment..."
    
    if [[ "$APP" == "all" ]]; then
        for app in "${APPS[@]}"; do
            kubectl rollout undo deployment/$app -n brizpickr-$ENVIRONMENT
        done
    else
        kubectl rollout undo deployment/$APP -n brizpickr-$ENVIRONMENT
    fi
    
    log_success "Rollback completed"
}

# Main deployment function
main() {
    log_info "Starting deployment to $ENVIRONMENT environment"
    log_info "App: $APP"
    
    # Validate inputs
    validate_environment
    validate_app
    
    # Check prerequisites
    check_prerequisites
    
    # Build and push images
    build_images
    push_images
    
    # Deploy to Kubernetes
    deploy_to_kubernetes
    
    # Run tests
    run_smoke_tests
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        run_e2e_tests
    fi
    
    # Monitor deployment
    monitor_deployment
    
    # Send notifications
    send_notifications
    
    log_success "Deployment completed successfully!"
}

# Error handling
trap 'log_error "Deployment failed. Rolling back..."; rollback; exit 1' ERR

# Run main function
main "$@" 
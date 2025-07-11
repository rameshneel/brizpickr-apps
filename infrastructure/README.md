# 🚀 BrizPickr Infrastructure Setup

Complete infrastructure setup for BrizPickr frontend applications with CI/CD pipelines and deployment options.

## 📁 Infrastructure Structure

```
infrastructure/
├── ci-cd/                    # CI/CD Pipelines
│   └── github-actions/
│       ├── frontend-ci.yml   # Continuous Integration
│       └── frontend-deploy.yml # Deployment Pipeline
├── deployment/               # Deployment Configurations
│   ├── vercel/              # Vercel Deployment (Recommended)
│   │   ├── vercel.json
│   │   └── build-scripts/
│   └── vps/                 # VPS Deployment (Alternative)
│       ├── nginx/
│       │   ├── nginx.conf
│       │   └── sites-available/
│       ├── ssl/
│       └── deployment-scripts/
└── scripts/                  # Utility Scripts
    ├── deploy.sh
    ├── health-check.sh
    └── rollback.sh
```

## 🎯 DevOps Team Responsibilities

### **Primary Responsibilities**

- ✅ **CI/CD Pipeline Management**
- ✅ **Deployment Automation**
- ✅ **Environment Management**
- ✅ **Performance Monitoring**
- ✅ **Security & Compliance**

### **Daily Tasks**

1. **Monitor CI/CD pipelines** for build failures
2. **Check application health** across environments
3. **Review deployment status** and performance
4. **Update deployment scripts** as needed
5. **Monitor costs** and optimize resources

## 🚀 Deployment Options

### **Option 1: Vercel (Recommended) ⭐**

**Best for**: Most frontend teams, rapid deployment, zero maintenance

#### **Pros:**

- ✅ **Zero maintenance** - No server management
- ✅ **Automatic deployments** from Git
- ✅ **Global CDN** for fast loading
- ✅ **Built-in analytics** and monitoring
- ✅ **Free tier** available
- ✅ **Automatic SSL** certificates
- ✅ **Preview deployments** for PRs

#### **Cons:**

- ❌ **Vendor lock-in** to Vercel platform
- ❌ **Limited customization** for advanced needs
- ❌ **Cost scaling** with high traffic

#### **Setup:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy an app
cd apps/customer-dashboard
vercel --prod
```

### **Option 2: VPS + Nginx (Alternative)**

**Best for**: Full control, cost optimization at scale, custom requirements

#### **Pros:**

- ✅ **Full control** over infrastructure
- ✅ **Cost effective** at scale
- ✅ **Custom configurations** possible
- ✅ **No vendor lock-in**
- ✅ **Multiple apps** on single server

#### **Cons:**

- ❌ **Server maintenance** required
- ❌ **Manual SSL** certificate management
- ❌ **Security updates** needed
- ❌ **Backup management** required
- ❌ **Monitoring setup** needed

#### **Setup:**

```bash
# Deploy to VPS
./infrastructure/scripts/deploy.sh vps staging customer-dashboard

# Check deployment status
./infrastructure/scripts/health-check.sh customer-dashboard
```

## 🚀 Quick Start Guide

### **1. Local Development**

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

### **2. CI/CD Pipeline**

The GitHub Actions pipeline automatically:

1. **Runs tests** on every push
2. **Builds applications** for staging/production
3. **Deploys to Vercel** (or VPS) on merge to main
4. **Runs health checks** post-deployment

### **3. Manual Deployment**

#### **Vercel Deployment:**

```bash
# Deploy to staging
vercel --env staging

# Deploy to production
vercel --prod
```

#### **VPS Deployment:**

```bash
# Deploy to staging
./infrastructure/scripts/deploy.sh vps staging customer-dashboard

# Deploy to production
./infrastructure/scripts/deploy.sh vps production customer-dashboard
```

## 🔧 CI/CD Pipeline

### **Automated Workflows**

1. **Quality Checks** - ESLint, Prettier, TypeScript
2. **Unit Tests** - Jest with coverage reporting
3. **E2E Tests** - Playwright automated testing
4. **Security Scan** - npm audit, Snyk vulnerability scan
5. **Build & Deploy** - Automatic deployment to staging/production
6. **Smoke Tests** - Post-deployment health checks

### **Manual Triggers**

```bash
# Manual deployment via GitHub Actions
# Go to: Actions > Frontend Deployment Pipeline > Run workflow
# Select environment: staging/production
# Select app: all/specific-app
```

## 📊 Monitoring & Health Checks

### **Vercel Monitoring**

- **Built-in Analytics**: Page views, performance metrics
- **Function Logs**: Serverless function monitoring
- **Error Tracking**: Automatic error reporting
- **Performance**: Core Web Vitals tracking

### **VPS Monitoring**

```bash
# Check application health
./infrastructure/scripts/health-check.sh customer-dashboard

# Monitor server resources
htop
df -h
free -h

# Check nginx status
sudo systemctl status nginx
sudo nginx -t
```

### **Health Check Endpoints**

- **Customer Dashboard**: `https://customer.brizpickr.com/health`
- **Vendor Portal**: `https://vendor.brizpickr.com/health`
- **Super Admin**: `https://admin.brizpickr.com/health`

## 🔒 Security & SSL

### **Vercel Security**

- ✅ **Automatic SSL** certificates via Let's Encrypt
- ✅ **DDoS protection** included
- ✅ **Security headers** automatically applied
- ✅ **HTTPS enforcement** for all traffic

### **VPS Security**

```bash
# SSL certificate renewal
sudo certbot renew

# Security updates
sudo apt update && sudo apt upgrade

# Firewall configuration
sudo ufw status
sudo ufw allow 80
sudo ufw allow 443
```

## 📈 Performance Optimization

### **Frontend Optimizations**

- ✅ **Code splitting** for faster initial loads
- ✅ **Image optimization** and lazy loading
- ✅ **Gzip compression** for all assets
- ✅ **Browser caching** with appropriate headers
- ✅ **CDN integration** for global delivery

### **Build Optimizations**

```bash
# Production build with optimizations
npm run build:prod

# Analyze bundle size
npm run analyze

# Lighthouse performance audit
npm run lighthouse
```

## 🚨 Troubleshooting

### **Common Issues**

1. **Build Failures**

   ```bash
   # Check build logs
   npm run build --verbose

   # Clear cache and rebuild
   npm run clean && npm run build
   ```

2. **Deployment Failures**

   ```bash
   # Check deployment logs
   vercel logs

   # Rollback to previous version
   vercel rollback
   ```

3. **Health Check Failures**

   ```bash
   # Check health endpoint
   curl -f https://customer.brizpickr.com/health

   # Check nginx configuration (VPS)
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### **Rollback Procedures**

#### **Vercel Rollback:**

```bash
# Rollback to previous deployment
vercel rollback

# Rollback to specific deployment
vercel rollback <deployment-id>
```

#### **VPS Rollback:**

```bash
# Rollback to previous version
./infrastructure/scripts/rollback.sh customer-dashboard
```

## 💰 Cost Comparison

### **Vercel Pricing**

- **Free Tier**: 100GB bandwidth, 100GB storage
- **Pro Plan**: $20/month - 1TB bandwidth, 100GB storage
- **Enterprise**: Custom pricing

### **VPS Pricing**

- **Basic VPS**: $5-10/month (DigitalOcean, Linode)
- **Bandwidth**: Usually included
- **SSL**: Free with Let's Encrypt
- **Monitoring**: Additional tools needed

## 🎯 Recommendations

### **For Your Team (Frontend + DevOps)**

**We recommend Vercel** for the following reasons:

1. **Zero Maintenance**: No server management required
2. **Automatic Deployments**: Git-based workflow
3. **Built-in Monitoring**: Analytics and error tracking
4. **Cost Effective**: Free tier for development
5. **Industry Standard**: Used by major companies
6. **Team Focus**: DevOps can focus on CI/CD, not infrastructure

### **When to Consider VPS**

- **High traffic** (>1M monthly visitors)
- **Custom requirements** not supported by Vercel
- **Cost optimization** at scale
- **Full control** over infrastructure

## 📞 Support & Resources

### **Vercel Support**

- **Documentation**: https://vercel.com/docs
- **Community**: https://github.com/vercel/vercel/discussions
- **Status Page**: https://vercel-status.com

### **VPS Resources**

- **Nginx Documentation**: https://nginx.org/en/docs/
- **SSL Setup**: https://letsencrypt.org/getting-started/
- **Server Security**: https://www.digitalocean.com/community/tutorials

### **Team Contacts**

- **DevOps Lead**: Primary infrastructure contact
- **Frontend Lead**: Application deployment coordination
- **Emergency**: On-call engineer rotation

## 📚 Additional Resources

- [NX Documentation](https://nx.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Playwright Testing](https://playwright.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Last Updated**: December 2024
**Version**: 2.0.0
**Maintained by**: DevOps Team
**Recommended Setup**: Vercel + GitHub Actions

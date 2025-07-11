# 🌿 GitHub Branch Strategy - GitFlow

Industry-standard branch strategy for BrizPickr SaaS application with multiple environments.

## 📋 Branch Structure

```
main (production)
├── develop (staging)
│   ├── feature/user-authentication
│   ├── feature/vendor-dashboard
│   └── feature/admin-panel
├── hotfix/critical-bug-fix
└── release/v1.2.0
```

## 🌳 Branch Types & Purposes

### **1. Main Branch (Production)**

- **Purpose**: Production-ready code only
- **Protection**: Required reviews, status checks
- **Deployment**: Automatic to production
- **Merge**: Only from `develop` or `hotfix/*`

### **2. Develop Branch (Staging)**

- **Purpose**: Integration branch for features
- **Protection**: Required reviews
- **Deployment**: Automatic to staging environment
- **Merge**: From `feature/*` branches

### **3. Feature Branches**

- **Naming**: `feature/descriptive-name`
- **Purpose**: New features, enhancements
- **Source**: `develop`
- **Target**: `develop`
- **Lifecycle**: Short-lived (1-3 days)

### **4. Release Branches**

- **Naming**: `release/version-number`
- **Purpose**: Prepare for production release
- **Source**: `develop`
- **Target**: `main` and `develop`
- **Activities**: Bug fixes, version bumping

### **5. Hotfix Branches**

- **Naming**: `hotfix/critical-issue`
- **Purpose**: Critical production fixes
- **Source**: `main`
- **Target**: `main` and `develop`
- **Urgency**: Immediate deployment

## 🔄 Workflow Process

### **Feature Development**

```bash
# 1. Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication

# 2. Develop and commit
git add .
git commit -m "feat: add user authentication system"

# 3. Push and create PR
git push origin feature/user-authentication
# Create PR: feature/user-authentication → develop
```

### **Release Process**

```bash
# 1. Create release branch
git checkout develop
git checkout -b release/v1.2.0

# 2. Version bump and final fixes
npm version patch
git commit -m "chore: bump version to 1.2.0"

# 3. Merge to main and develop
git checkout main
git merge release/v1.2.0
git tag v1.2.0

git checkout develop
git merge release/v1.2.0

# 4. Delete release branch
git branch -d release/v1.2.0
```

### **Hotfix Process**

```bash
# 1. Create hotfix branch
git checkout main
git checkout -b hotfix/critical-security-fix

# 2. Fix and commit
git commit -m "fix: critical security vulnerability"

# 3. Merge to main and develop
git checkout main
git merge hotfix/critical-security-fix
git tag v1.2.1

git checkout develop
git merge hotfix/critical-security-fix

# 4. Delete hotfix branch
git branch -d hotfix/critical-security-fix
```

## 🛡️ Branch Protection Rules

### **Main Branch Protection**

```yaml
# Required settings
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Require linear history
- Restrict pushes that create files larger than 100MB

# Status checks
- Build and test
- Security scan
- Code coverage
- E2E tests
```

### **Develop Branch Protection**

```yaml
# Required settings
- Require pull request reviews before merging
- Require status checks to pass before merging
- Dismiss stale PR approvals when new commits are pushed

# Status checks
- Build and test
- Security scan
- Code coverage
```

## 📝 Commit Message Convention

### **Conventional Commits Format**

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### **Types**

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### **Examples**

```bash
feat(auth): add OAuth2 authentication
fix(dashboard): resolve data loading issue
docs(readme): update deployment instructions
style(components): format code with prettier
refactor(api): restructure API client
test(e2e): add user flow tests
chore(deps): update dependencies
```

## 🏷️ Versioning Strategy

### **Semantic Versioning (SemVer)**

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### **Version Tags**

```bash
# Create version tag
git tag -a v1.2.0 -m "Release version 1.2.0"

# Push tags
git push origin --tags

# List tags
git tag -l
```

## 🔧 Environment Mapping

| Branch      | Environment | URL                             | Purpose         |
| ----------- | ----------- | ------------------------------- | --------------- |
| `main`      | Production  | `https://app.brizpickr.com`     | Live users      |
| `develop`   | Staging     | `https://staging.brizpickr.com` | Testing         |
| `feature/*` | Development | `https://dev.brizpickr.com`     | Feature testing |

## 📋 Pull Request Template

### **Feature PR Template**

```markdown
## 🚀 Feature Description

Brief description of the feature

## 🔗 Related Issues

Closes #123

## ✅ Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes

## 🧪 Testing

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## 📸 Screenshots (if applicable)
```

### **Bug Fix PR Template**

```markdown
## 🐛 Bug Description

Description of the bug

## 🔍 Root Cause

What caused the bug

## ✅ Fix

How the bug was fixed

## 🧪 Testing

- [ ] Bug reproduction steps tested
- [ ] Fix verified
- [ ] No regression introduced

## 📋 Checklist

- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
```

## 🚨 Emergency Procedures

### **Critical Hotfix Process**

1. **Immediate Action**: Create hotfix branch from main
2. **Quick Fix**: Implement minimal fix
3. **Testing**: Basic functionality test
4. **Deployment**: Deploy to production immediately
5. **Follow-up**: Proper testing and documentation

### **Rollback Process**

```bash
# Rollback to previous version
git checkout main
git revert <commit-hash>
git push origin main

# Or rollback to specific tag
git checkout v1.1.0
git checkout -b rollback/v1.1.0
git push origin rollback/v1.1.0
```

## 📊 Branch Metrics

### **Health Indicators**

- **Feature branch age**: < 3 days
- **PR review time**: < 24 hours
- **Deployment frequency**: Daily
- **Lead time**: < 1 day
- **MTTR**: < 4 hours

### **Monitoring Commands**

```bash
# Check branch status
git branch -r --sort=-committerdate

# Find stale branches
git for-each-ref --format='%(committerdate:short) %(refname:short)' refs/remotes/origin/ | grep -v main | grep -v develop

# Check PR status
gh pr list --state open --limit 10
```

## 🎯 Best Practices

### **Do's**

- ✅ Keep feature branches small and focused
- ✅ Write descriptive commit messages
- ✅ Review code thoroughly
- ✅ Test before merging
- ✅ Delete merged branches
- ✅ Use conventional commits

### **Don'ts**

- ❌ Commit directly to main/develop
- ❌ Merge without review
- ❌ Leave branches open for weeks
- ❌ Skip testing
- ❌ Use vague commit messages
- ❌ Force push to protected branches

## 📚 Resources

- [GitFlow Workflow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Maintained by**: DevOps Team

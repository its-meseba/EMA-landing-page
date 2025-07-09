# EMA Modal Shopify Extension Implementation Guide

## Overview

This guide outlines the implementation of EMA Modal as a Shopify Theme App Extension. The extension provides voice-activated customer assistance through an interactive modal that can be embedded in any Shopify theme.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Architecture Overview](#architecture-overview)
3. [Implementation Steps](#implementation-steps)
4. [Configuration](#configuration)
5. [Development Setup](#development-setup)
6. [Deployment](#deployment)
7. [Testing](#testing)
8. [Maintenance](#maintenance)

## Prerequisites

### Required Tools
- **Node.js** (v18 or later)
- **Shopify CLI** (latest version)
- **Git** for version control
- **Shopify Partner Account** for app development
- **Development Store** for testing

### Required Knowledge
- JavaScript/TypeScript
- React.js
- Shopify Liquid templating
- Shopify App development basics
- CSS/SCSS

### Shopify App Requirements
- **App Type**: Public or Custom App
- **Extension Type**: Theme App Extension
- **Scopes**: `read_themes`, `write_themes`
- **API Access**: Storefront API (optional, for enhanced features)

## Architecture Overview

### Extension Structure
```
shopify-extension/
├── extensions/
│   └── ema-modal-theme-extension/
│       ├── assets/                 # Static assets (CSS, JS, images)
│       ├── blocks/                 # App blocks for theme editor
│       ├── locales/               # Translations
│       ├── snippets/              # Reusable Liquid code
│       └── shopify.extension.toml # Extension configuration
├── web/                           # Backend app (Node.js/Express)
├── frontend/                      # Admin dashboard (React)
└── package.json
```

### Component Architecture
- **Theme App Extension**: Injects EMA Modal into storefront
- **App Blocks**: Configurable blocks for theme editor
- **Admin Dashboard**: Merchant configuration interface
- **Webhook Handlers**: Real-time configuration updates

### Data Flow
1. Merchant configures EMA settings in admin dashboard
2. Configuration stored in app database/metafields
3. Theme extension reads configuration via Liquid
4. React component renders with merchant settings
5. Customer interacts with EMA modal

## Implementation Steps

### Step 1: Project Setup

#### 1.1 Initialize Shopify App
```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Create new app
shopify app init ema-modal-app

# Navigate to project
cd ema-modal-app
```

#### 1.2 App Configuration
```toml
# shopify.app.toml
name = "EMA Modal"
client_id = "your_app_client_id"
application_url = "https://your-app-domain.com"
embedded = true

[access_scopes]
scopes = "read_themes,write_themes"

[auth]
redirect_urls = [
  "https://your-app-domain.com/auth/callback"
]

[webhooks]
api_version = "2024-01"

[pos]
embedded = false
```

### Step 2: Create Theme App Extension

#### 2.1 Generate Extension
```bash
# Generate theme app extension
shopify app generate extension

# Select:
# - Theme app extension
# - Name: ema-modal-theme-extension
# - Language: JavaScript
```

#### 2.2 Extension Configuration
```toml
# extensions/ema-modal-theme-extension/shopify.extension.toml
name = "EMA Modal"
type = "theme"
api_version = "2024-01"

[extension_points]
  [[extension_points.metafields]]
  namespace = "ema_modal"
  key = "configuration"
  
[capabilities]
  block_templates = true
  app_blocks = true
```

### Step 3: Implementation Details

The complete implementation includes:
- **App Block Schema**: Theme editor configuration
- **React Component**: Reusable from WordPress version
- **Admin Dashboard**: Merchant configuration interface
- **Localization**: Multi-language support
- **Build Process**: Asset optimization and deployment

### Step 4: Development Workflow

```bash
# Start development
npm run dev

# Build extension assets
npm run build:extension

# Deploy to Shopify
npm run deploy
```

## Configuration

### Theme Editor Integration
- Merchants add EMA Modal block through theme editor
- Configure settings directly in theme customizer
- Preview changes in real-time
- Enable/disable per theme section

### Advanced Configuration
- **Metafields**: Store complex configurations
- **Webhooks**: Real-time updates
- **GraphQL**: Enhanced data fetching
- **App Proxy**: Custom endpoints

## Development Setup

### Local Development
```bash
# Clone repository
git clone https://github.com/your-org/ema-modal-shopify
cd ema-modal-shopify

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-app-domain.com
DATABASE_URL=your_database_url
```

## Deployment

### Production Deployment
1. **Build Assets**: `npm run build:extension`
2. **Deploy App**: `npm run deploy`
3. **Submit for Review**: Shopify Partner Dashboard
4. **Distribution**: App Store or private distribution

## Testing

### Testing Strategy
1. **Unit Tests**: React components
2. **Integration Tests**: API endpoints
3. **E2E Tests**: Full user workflows
4. **Performance Tests**: Loading times
5. **Compatibility Tests**: Multiple themes

## Maintenance

### Updates & Versioning
- Follow semantic versioning
- Test with latest Shopify API versions
- Monitor extension performance
- Regular security updates

### Support & Documentation
- Maintain comprehensive docs
- Provide merchant support
- Monitor app analytics
- Collect user feedback

## Best Practices

### Code Quality
- TypeScript for type safety
- ESLint/Prettier for consistency
- Code reviews for quality
- Automated testing

### Security
- Validate all inputs
- Secure API endpoints
- Handle errors gracefully
- Regular security audits

### User Experience
- Fast loading times
- Responsive design
- Accessible interface
- Clear error messages

---

This guide provides a comprehensive roadmap for implementing EMA Modal as a Shopify extension. The actual implementation follows in the accompanying code structure. 
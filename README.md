# NTK CMS Web Angular v10

A comprehensive Content Management System (CMS) built with Angular 20, featuring a modular architecture with extensive functionality for content management, user administration, and business operations.

## 🚀 Project Overview

NTK CMS Web is a modern, feature-rich content management system designed for enterprise-level applications. It provides a complete solution for managing websites, content, users, and business operations with a modular architecture that allows for easy customization and extension.

### Key Features

- **Modular Architecture**: 30+ specialized modules for different business needs
- **Multi-language Support**: Built-in internationalization (i18n) with 8 languages
- **Progressive Web App (PWA)**: Offline capabilities and mobile-friendly design
- **Real-time Communication**: SignalR integration for live updates
- **Advanced UI Components**: Material Design with custom components
- **File Management**: Comprehensive file upload and management system
- **Security**: Role-based access control and authentication
- **Responsive Design**: Mobile-first approach with Bootstrap 5

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher) or **yarn**
- **Angular CLI** (v20 or higher)

### Installation

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Clone the repository
git clone <repository-url>
cd Ntk.Cms.Web.Angular.v10

# Install dependencies
npm install
```

## 🛠️ Development Setup

### 1. Environment Configuration

The project uses environment-specific configurations. Update `src/environments/environment.ts` for development:

```typescript
export const environment: EnvironmentModel = {
  production: false,
  cmsServerConfig: {
    configApiServerPath: 'https://your-api-server.com/api/v3/',
    configHubServerPath: 'https://your-api-server.com/hub/',
    configFileServerPath: 'https://your-file-server.com/api/v2/',
    // ... other configurations
  }
};
```

### 2. Available Scripts

```bash
# Development server
npm start
# or
ng serve

# Production build
npm run build-prod

# PWA development
npm run pwa

# Testing
npm test

# Memory-optimized builds
npm run serve1  # 4GB memory
npm run serve2  # 6GB memory
npm run serve3  # 16GB memory
npm run serve4  # 32GB memory
```

## 🏗️ Project Architecture

### Core Structure

```
src/
├── app/
│   ├── cms-modules/          # Main CMS modules
│   ├── components/           # Reusable UI components
│   ├── core/                # Core services and utilities
│   ├── modules/             # Application modules
│   └── shared/              # Shared components and utilities
├── assets/                  # Static assets
└── environments/            # Environment configurations
```

### CMS Modules

The application includes 30+ specialized modules:

#### Core Modules
- **Core Main**: Main dashboard and core functionality
- **Core Module**: Module management
- **Core Module Log**: Logging and audit trails
- **Core Module Data**: Data management
- **Core Token**: Token and authentication management
- **Core Log**: System logging

#### Content Management
- **Article**: Article and content management
- **Blog**: Blog system
- **News**: News management
- **Biography**: Biography and profile management
- **Catalog**: Product catalog management

#### Business Modules
- **Estate**: Real estate management
- **Hyper Shop**: E-commerce functionality
- **Bank Payment**: Payment processing
- **Donate**: Donation management
- **Member**: User and member management

#### Communication & Support
- **Contact**: Contact management
- **SMS**: SMS integration
- **Ticketing**: Support ticket system
- **Polling**: Survey and polling system
- **API Telegram**: Telegram bot integration

#### Technical Modules
- **File Manager**: File upload and management
- **Link Management**: URL and link management
- **Universal Menu**: Menu system
- **Web Designer**: Visual page builder
- **Web Designer Builder**: Advanced page building tools
- **Data Provider**: Data source management
- **Chart**: Data visualization

### Shared Components

The project includes 50+ reusable components:

- **Form Components**: File uploaders, selectors, autocomplete
- **Display Components**: Lists, cards, modals, notices
- **Data Components**: JSON lists, HTML widgets, maps
- **Utility Components**: Confirmation dialogs, progress indicators

## 🔧 Configuration

### Environment Variables

Key configuration options in `environment.ts`:

```typescript
export const environment: EnvironmentModel = {
  production: false,
  mainTitle: 'سامانه مدیریتی محتوا',
  languagesDefault: 'fa',
  cmsServerConfig: {
    configApiServerPath: 'https://your-api-server.com/api/v3/',
    configHubServerPath: 'https://your-api-server.com/hub/',
    configFileServerPath: 'https://your-file-server.com/api/v2/',
    configQDocServerPath: 'https://qdoc.ir/api/chat',
  },
  cmsTokenConfig: {
    SecurityKey: 'your-security-key',
    DeviceType: DeviceTypeEnum.WebSite,
  }
};
```

### Supported Languages

- Persian (فارسی) - Default
- Arabic (عربی)
- English
- Chinese (China)
- Spanish
- Japanese
- German
- French

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build-prod

# Build with memory optimization
npm run build-prod2  # 16GB memory
npm run build-prod3  # 32GB memory
```

### PWA Deployment

```bash
# Build PWA
npm run pwa

# Serve PWA locally
npm run pwa-dist
```

## 📱 Progressive Web App (PWA)

The application includes PWA capabilities:

- **Service Worker**: Offline functionality
- **Web Manifest**: App-like experience
- **Responsive Design**: Mobile-first approach
- **Installation**: Add to home screen capability

## 🔒 Security Features

- **Authentication**: Token-based authentication
- **Authorization**: Role-based access control
- **Guards**: Route protection with `CmsAuthGuard`
- **Interceptors**: HTTP request/response handling
- **Security Headers**: CSP and security configurations

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
ng test --code-coverage
```

## 📦 Dependencies

### Core Dependencies
- **Angular 20**: Core framework
- **Angular Material**: UI components
- **Bootstrap 5**: CSS framework
- **RxJS**: Reactive programming
- **SignalR**: Real-time communication

### Key Libraries
- **ntk-cms-api**: CMS API integration
- **ntk-cms-filemanager**: File management
- **ngx-ntk-smart-module**: Smart module system
- **ngx-toastr**: Notifications
- **ngx-translate**: Internationalization
- **leaflet**: Maps integration
- **apexcharts**: Data visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Contact the development team

## 🔄 Version History

- **v20.25.0805.1**: Current version
- Angular 20 upgrade
- Enhanced PWA features
- Improved performance
- New modules and components

---

**Note**: This is a comprehensive CMS system designed for enterprise use. Ensure proper security configurations and testing before deployment to production environments.

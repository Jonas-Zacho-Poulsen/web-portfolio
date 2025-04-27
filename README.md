# Personal Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://web-portfolio-niglouvxv-jonas-zacho-poulsens-projects.vercel.app)

A modern, responsive portfolio website showcasing my projects and skills. Built with the latest web technologies and best practices.

## 🌟 Features

- ⚡ **Next.js 14** with App Router and Server Components
- 🎨 **Modern Design**
  - Responsive layout
  - Dark/Light mode with system preference sync
  - Smooth animations with Framer Motion
- 🤖 **Chat Assistant**
  - Context-aware responses
  - Predefined topics with dynamic suggestions
  - Smooth animations and typing indicators
- 🎯 **Dynamic Project Showcase**
  - GitHub integration
  - Live project status
  - Tech stack visualization
- 💻 **Technical Features**
  - TypeScript for type safety
  - Tailwind CSS for styling
  - SEO optimization
  - Performance optimized
  - Responsive images
  - Modern animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: React Hooks
- **Version Control**: Git
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Jonas-Zacho-Poulsen/web-portfolio.git
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

This project is deployed on Vercel. The production environment is automatically updated when changes are pushed to the `main` branch.

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Deploy to production:
```bash
vercel --prod
```

### Environment Variables

Make sure to set up the following environment variables in your Vercel project settings:

- `NEXT_PUBLIC_SITE_URL`: Your production URL
- `NEXT_PUBLIC_GITHUB_USERNAME`: Your GitHub username
- `GITHUB_TOKEN` (optional): For higher GitHub API rate limits
- `NEXT_PUBLIC_GA_ID` (optional): Google Analytics ID
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (optional): Umami analytics ID
- `NEXT_PUBLIC_UMAMI_URL` (optional): Umami analytics URL

## 📁 Project Structure

The project follows a well-organized, modular architecture designed for scalability and maintainability:

```
├── src/
│   ├── app/             # Next.js App Router pages and API routes
│   │   ├── api/         # API endpoints (contact form, etc.)
│   │   └── page.tsx     # Main page component
│   ├── components/      # Reusable UI components
│   │   ├── sections/    # Main page sections (Hero, About, etc.)
│   │   ├── ui/          # Shared UI components (Button, Card, etc.)
│   │   └── layout/      # Layout components (Navigation, Footer, etc.)
│   ├── config/          # Application configuration and constants
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services and data fetching
│   │   └── fallback-data.ts  # Fallback data when API requests fail
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions and helpers
├── public/              # Static assets (images, fonts, etc.)
└── ...config files      # Configuration files for Next.js, TypeScript, etc.
```

### Architecture Overview

The application follows a clean, modular architecture with clear separation of concerns:

- **Presentation Layer**: Components in `src/components/` handle the UI rendering
- **Data Layer**: Services in `src/services/` handle data fetching and API interactions
- **State Management**: Uses React hooks and context for state management
- **Type System**: Comprehensive TypeScript types in `src/types/`
- **Configuration**: Centralized configuration in `src/config/`
- **Utilities**: Reusable helper functions in `src/utils/`

## 🔧 Development

### Code Quality

- **TypeScript**: Strong typing for better code quality and developer experience
- **ESLint**: Static code analysis to catch problems early
- **Prettier**: Consistent code formatting
- **Component Architecture**: Modular, reusable components with clear responsibilities

### Git Workflow

- **Feature Branches**: Development happens in feature branches
- **Pull Requests**: Code review process through pull requests
- **Conventional Commits**: Structured commit messages for better readability

### Testing (Planned)

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing

### CI/CD (Planned)

- **GitHub Actions**: Automated testing and linting
- **Vercel Integration**: Automatic deployments
- **Preview Deployments**: Preview environments for pull requests

## 📱 Responsive Design

The portfolio is built with a mobile-first approach to ensure a great experience on all devices:

- **Mobile-First**: Designed for mobile devices first, then enhanced for larger screens
- **Responsive Grid**: Flexible grid system that adapts to different screen sizes
- **Fluid Typography**: Text sizes that scale based on viewport width
- **Optimized Images**: Images are optimized and properly sized for different devices
- **Touch-Friendly**: Interactive elements are designed for touch interactions
- **Media Queries**: Custom media queries for precise control over breakpoints
- **Viewport Meta Tag**: Proper viewport configuration for mobile devices
- **Testing**: Tested on multiple devices and screen sizes

## 🎨 Design System

The portfolio uses a consistent design system to ensure visual coherence:

### Colors

- **Primary**: Green (#19C37D) - Used for primary actions and key highlights
- **Secondary**: Subtle gray tones for backgrounds and secondary elements
- **Accent**: Purple and blue gradients for visual interest
- **Semantic Colors**: Success, warning, and error states
- **Dark/Light Themes**: Complete color system for both themes

### Typography

- **Font Family**: Inter, a modern sans-serif typeface
- **Type Scale**: Consistent sizing based on a modular scale
- **Font Weights**: Strategic use of weights for visual hierarchy
- **Line Heights**: Optimized for readability
- **Responsive Sizing**: Font sizes adjust based on viewport

### Spacing

- **Consistent Scale**: Based on a 4px grid (4px, 8px, 16px, 24px, etc.)
- **Component Spacing**: Consistent margins and padding
- **Responsive Adjustments**: Spacing adapts to different screen sizes

### Components

- **Button Variants**: Primary, secondary, outline, and ghost
- **Card Styles**: Various card designs for different content types
- **Form Elements**: Styled inputs, selects, and form controls
- **Navigation**: Consistent navigation patterns

### Animations

- **Transitions**: Smooth transitions between states
- **Hover Effects**: Subtle feedback on interactive elements
- **Page Transitions**: Smooth transitions between pages
- **Loading States**: Animated loading indicators

## 📫 Contact

Feel free to reach out to me through any of these channels:

- **Email**: [jonaszachopoulsen@live.dk](mailto:jonaszachopoulsen@live.dk)
- **GitHub**: [@Jonas-Zacho-Poulsen](https://github.com/Jonas-Zacho-Poulsen)
- **LinkedIn**: [j-poulsen-](https://www.linkedin.com/in/j-poulsen-/)
- **Phone**: +45 50 22 73 00

## 🔒 Security

This project follows security best practices:

- **HTTPS**: Secure communication with TLS
- **Content Security Policy**: Prevents XSS attacks
- **Input Validation**: All user inputs are validated
- **Dependency Scanning**: Regular checks for vulnerable dependencies
- **Environment Variables**: Sensitive information stored in environment variables

## 🚀 Performance

Performance optimization techniques used in this project:

- **Code Splitting**: Only load what's needed
- **Image Optimization**: Next.js image optimization
- **Lazy Loading**: Components and images load as needed
- **Caching**: Proper cache headers for static assets
- **Minification**: CSS and JavaScript are minified
- **Tree Shaking**: Unused code is removed
- **Preloading**: Critical resources are preloaded

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Jonas Zacho Poulsen
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
  - Interactive particle background
- 🤖 **AI Chat Assistant**
  - Context-aware responses
  - Predefined topics with dynamic suggestions
  - Smooth animations and typing indicators
- 🎯 **Dynamic Project Showcase**
  - GitHub integration
  - Live project status
  - Tech stack visualization
  - Project screenshots carousel
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

```
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # Reusable UI components
│   │   ├── sections/    # Main page sections
│   │   └── ui/         # Shared UI components
│   └── lib/            # Utilities and helpers
├── public/             # Static assets
└── ...config files
```

## 🔧 Development

- **Code Style**: ESLint + Prettier
- **Git Workflow**: Feature branches and pull requests
- **Testing**: Jest + React Testing Library (planned)
- **CI/CD**: GitHub Actions + Vercel (planned)

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints for all devices
- Optimized images
- Touch-friendly interactions

## 🎨 Design System

- Custom color scheme
- Consistent spacing
- Typography scale
- Dark/Light themes
- Smooth transitions

## 📫 Contact

- Email: jonaszachopoulsen@live.dk
- GitHub: [@Jonas-Zacho-Poulsen](https://github.com/Jonas-Zacho-Poulsen)

## 📄 License

This project is open source and available under the [MIT License](LICENSE). 
/**
 * Application configuration
 * Centralizes all configuration values and constants used throughout the application
 */

/**
 * Site metadata for SEO and general information
 */
export const siteConfig = {
  name: 'Jonas Zacho Poulsen',
  title: 'Jonas Zacho Poulsen - Backend & Full-Stack Engineer | C#/.NET, React',
  description:
    'Backend Engineer specializing in C#/.NET, React, and scalable integrations. Available for contracts and full-time roles in EU time zones.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://jonas-poulsen.vercel.app',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/Jonas-Zacho-Poulsen',
    linkedin: 'https://www.linkedin.com/in/j-poulsen-/',
    email: 'jonaszp97@gmail.com',
    phone: '+45 50 22 73 00',
  },
}

/**
 * Navigation items for the main navigation
 */
export const navigationItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

/**
 * Social media links for contact section and footer
 */
export const socialLinks = [
  {
    name: 'Email',
    value: 'jonaszp97@gmail.com',
    href: 'mailto:jonaszp97@gmail.com',
  },
  {
    name: 'Phone',
    value: '+45 50 22 73 00',
    href: 'tel:+4550227300',
  },
  {
    name: 'GitHub',
    value: 'Jonas-Zacho-Poulsen',
    href: 'https://github.com/Jonas-Zacho-Poulsen',
  },
  {
    name: 'LinkedIn',
    value: 'j-poulsen-',
    href: 'https://www.linkedin.com/in/j-poulsen-/',
  },
]

/**
 * Chat assistant configuration
 */
export const chatConfig = {
  rateLimit: 300, // Reduced rate limit for faster responses
  predefinedResponses: {
    experience: `Jonas is a Backend and Full-Stack Engineer with experience building reliable systems across healthcare, enterprise, and AI-driven products. He focuses on APIs, integrations, and technical ownership in collaborative engineering teams. Open to onsite, hybrid, and remote roles in EU time zones.`,

    skills: `Jonas' key technical skills include:
  - Backend: C#/.NET, Python, Node.js, TypeScript, PostgreSQL
  - Frontend: React, Next.js, Tailwind CSS
  - APIs & Cloud: REST APIs, Azure, Docker, CI/CD
  - Tools: Git, Jira, VS Code, Agile/Scrum`,

    projects: `Jonas has worked on:
  - Multi-tenant AI platform automating ERP workflows (LogicNodes)
  - Automated clinical data reporting systems (Region Nordjylland)
  - Repository migrations and process automation (Rohde & Schwarz)

  Check his GitHub for more: github.com/Jonas-Zacho-Poulsen`,

    contact: `Get in Touch with Jonas:
  📧 Email: jonaszp97@gmail.com
  📞 Phone: +45 50 22 73 00
  🐙 GitHub: github.com/Jonas-Zacho-Poulsen
  💼 LinkedIn: linkedin.com/in/j-poulsen-

  🔽 Download CV for more details.`,

    default:
      "I'm an assistant that can help you learn more about Jonas' experience, skills, and projects. Feel free to ask me anything!",
  },

  suggestedQuestions: {
    experience: [
      'What technical skills does Jonas have?',
      'Can you tell me about his projects?',
      'How can I contact Jonas?',
    ],
    skills: [
      "What's Jonas' work experience?",
      'Tell me about his projects',
      "What's the best way to reach him?",
    ],
    projects: [
      'What are his technical skills?',
      "What's his background?",
      'How can I get in touch?',
    ],
    contact: [
      "What's Jonas' experience?",
      'What technologies does he work with?',
      'Tell me about his projects',
    ],
    default: [
      "What's Jonas' background?",
      'What are his technical skills?',
      'Tell me about his projects',
      'How can I contact him?',
    ],
  },
}

/**
 * Tech stack icons mapping
 */
export const techStackIcons = {
  'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  typescript:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  tailwindcss:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  postgresql:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'c#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  javascript:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  dotnet: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  azure: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
}

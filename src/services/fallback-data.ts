/**
 * Fallback data for when API requests fail
 * This ensures the site works even without external API access
 */
import { Repository, SkillCategory } from '@/types';
import { techStackIcons } from '@/config';

/**
 * Fallback projects data
 */
export const fallbackProjects: Repository[] = [
  {
    id: 1,
    name: "Portfolio Website",
    description: "Personal portfolio built with Next.js 14, TypeScript, and Tailwind CSS. Features dark mode, animations, and responsive design.",
    html_url: "https://github.com/Jonas-Zacho-Poulsen/portfolio",
    topics: ["next.js", "typescript", "tailwindcss", "framer-motion"],
    stargazers_count: 0,
    language: "TypeScript",
    screenshots: ["/portfolio-screenshot.png"],
    demo_url: "https://cursor-portfolio-9xtp49961-jonas-zacho-poulsens-projects.vercel.app",
    status: "completed",
    tech_stack: [
      { name: "Next.js", icon: techStackIcons["next.js"] },
      { name: "TypeScript", icon: techStackIcons.typescript },
      { name: "Tailwind CSS", icon: techStackIcons.tailwindcss },
      { name: "React", icon: techStackIcons.react }
    ],
    github_stats: {
      forks: 0,
      issues: 0,
      watchers: 0
    }
  },
  {
    id: 2,
    name: "Chat Application",
    description: "Real-time chat application with WebSocket integration, user authentication, and message history.",
    html_url: "https://github.com/Jonas-Zacho-Poulsen/chat-app",
    topics: ["react", "websocket", "firebase", "tailwindcss"],
    stargazers_count: 0,
    language: "JavaScript",
    screenshots: ["/chat-app-screenshot.png"],
    demo_url: "https://chat.jonas-zacho.com",
    status: "in-progress",
    tech_stack: [
      { name: "React", icon: techStackIcons.react },
      { name: "JavaScript", icon: techStackIcons.javascript },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Tailwind CSS", icon: techStackIcons.tailwindcss }
    ],
    github_stats: {
      forks: 0,
      issues: 0,
      watchers: 0
    }
  },
  {
    id: 3,
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with Next.js, tRPC, and Prisma. Features cart management and Stripe integration.",
    html_url: "https://github.com/Jonas-Zacho-Poulsen/ecommerce",
    topics: ["next.js", "trpc", "prisma", "stripe"],
    stargazers_count: 0,
    language: "TypeScript",
    screenshots: [],
    demo_url: "https://shop.jonas-zacho.com",
    status: "completed",
    tech_stack: [
      { name: "Next.js", icon: techStackIcons["next.js"] },
      { name: "TypeScript", icon: techStackIcons.typescript },
      { name: "PostgreSQL", icon: techStackIcons.postgresql },
      { name: "Docker", icon: techStackIcons.docker }
    ],
    github_stats: {
      forks: 0,
      issues: 0,
      watchers: 0
    }
  }
];

/**
 * Skill icons mapping
 */
export const skillIcons = {
  // Programming Languages
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  
  // Frameworks & Libraries
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  ".NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg",
  "ASP.NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  
  // Tools & Platforms
  "Azure": "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg",
  "Git": "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
  "GitLab": "https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg",
  "Docker": "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
  "PostgreSQL": "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg",
  "Redis": "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg",
  "Linux": "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
  "Visual Studio": "https://raw.githubusercontent.com/devicons/devicon/master/icons/visualstudio/visualstudio-plain.svg",
  "VS Code": "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
  "Vercel": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
  
  // Project Management & Collaboration
  "Jira": "https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg",
  "Confluence": "https://raw.githubusercontent.com/devicons/devicon/master/icons/confluence/confluence-original.svg",
  "Trello": "https://raw.githubusercontent.com/devicons/devicon/master/icons/trello/trello-plain.svg"
};

/**
 * Skill descriptions for tooltips
 */
export const skillDescriptions = {
  "C#": "My primary language for backend development with .NET",
  "JavaScript": "Used extensively for frontend and Node.js development",
  "TypeScript": "Preferred for type-safe JavaScript development",
  "Python": "Used for data processing, automation, and scripting",
  "React": "Library of choice for building interactive UIs",
  ".NET": "Framework for building scalable backend services",
  "Next.js": "React framework for production-grade applications",
  "Docker": "For containerization and consistent deployment environments",
  "Azure": "Cloud platform for hosting and scaling applications",
  "Agile": "Methodology for iterative and incremental development",
  "CI/CD": "Automated testing and deployment pipelines"
};

/**
 * Skills data organized by category
 */
export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: skillIcons["TypeScript"],
    description: "Core languages I use to build applications",
    items: [
      { name: "C#", icon: skillIcons["C#"], proficiency: 95, description: skillDescriptions["C#"] },
      { name: "JavaScript", icon: skillIcons["JavaScript"], proficiency: 90, description: skillDescriptions["JavaScript"] },
      { name: "TypeScript", icon: skillIcons["TypeScript"], proficiency: 90, description: skillDescriptions["TypeScript"] },
      { name: "Python", icon: skillIcons["Python"], proficiency: 90, description: skillDescriptions["Python"] },
      { name: "Java", icon: skillIcons["Java"], proficiency: 85 },
      { name: "SQL", icon: skillIcons["SQL"], proficiency: 90 },
      { name: "HTML5", icon: skillIcons["HTML5"], proficiency: 90 },
      { name: "CSS3", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", proficiency: 85 }
    ]
  },
  {
    category: "Frameworks & Libraries",
    icon: skillIcons["React"],
    description: "Tools that accelerate my development workflow",
    items: [
      { name: "React", icon: skillIcons["React"], proficiency: 90, description: skillDescriptions["React"] },
      { name: ".NET", icon: skillIcons[".NET"], proficiency: 95, description: skillDescriptions[".NET"] },
      { name: "ASP.NET", icon: skillIcons["ASP.NET"], proficiency: 90 },
      { name: "Next.js", icon: skillIcons["Next.js"], proficiency: 85, description: skillDescriptions["Next.js"] },
      { name: "Node.js", icon: skillIcons["Node.js"], proficiency: 85 },
      { name: "Tailwind CSS", icon: skillIcons["Tailwind CSS"], proficiency: 85 },
      { name: "Framer Motion", icon: skillIcons["Framer Motion"], proficiency: 80 },
      { name: "Express.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg", proficiency: 80 }
    ]
  },
  {
    category: "Tools & Platforms",
    icon: skillIcons["Docker"],
    description: "Technologies I use for deployment and operations",
    items: [
      { name: "Azure", icon: skillIcons["Azure"], proficiency: 90, description: skillDescriptions["Azure"] },
      { name: "Git", icon: skillIcons["Git"], proficiency: 95 },
      { name: "Docker", icon: skillIcons["Docker"], proficiency: 80, description: skillDescriptions["Docker"] },
      { name: "PostgreSQL", icon: skillIcons["PostgreSQL"], proficiency: 85 },
      { name: "Jira", icon: skillIcons["Jira"], proficiency: 90 },
      { name: "Linux", icon: skillIcons["Linux"], proficiency: 85 },
      { name: "Visual Studio", icon: skillIcons["Visual Studio"], proficiency: 90 },
      { name: "Vercel", icon: skillIcons["Vercel"], proficiency: 85 }
    ]
  },
  {
    category: "Methodologies & Practices",
    icon: skillIcons["Jira"],
    description: "Approaches I follow for effective development",
    items: [
      { name: "Agile", icon: skillIcons["Jira"], proficiency: 90, description: skillDescriptions["Agile"] },
      { name: "Scrum", icon: skillIcons["Jira"], proficiency: 90 },
      { name: "Test Automation", icon: skillIcons["Visual Studio"], proficiency: 85 },
      { name: "CI/CD", icon: skillIcons["GitLab"], proficiency: 85, description: skillDescriptions["CI/CD"] },
      { name: "REST APIs", icon: skillIcons["Node.js"], proficiency: 90 },
      { name: "Prompt Engineering", icon: "https://www.svgrepo.com/show/306500/openai.svg", proficiency: 90 }
    ]
  }
].map(category => ({
  ...category,
  items: [...category.items].sort((a, b) => b.proficiency - a.proficiency)
}));

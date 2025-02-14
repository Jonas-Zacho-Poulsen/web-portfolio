"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Skill {
  name: string
  icon: string
}

interface SkillCategory {
  category: string
  items: Skill[]
}

const skillIcons = {
  // Frontend
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  
  // Backend
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "tRPC": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Prisma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  
  // DevOps
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "GitHub Actions": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Vercel": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "CI/CD": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  
  // Tools
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "VS Code": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "Postman": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "Jest": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg"
}

const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: skillIcons["React"] },
      { name: "Next.js", icon: skillIcons["Next.js"] },
      { name: "TypeScript", icon: skillIcons["TypeScript"] },
      { name: "Tailwind CSS", icon: skillIcons["Tailwind CSS"] },
      { name: "Framer Motion", icon: skillIcons["Framer Motion"] }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: skillIcons["Node.js"] },
      { name: "tRPC", icon: skillIcons["tRPC"] },
      { name: "Prisma", icon: skillIcons["Prisma"] },
      { name: "PostgreSQL", icon: skillIcons["PostgreSQL"] },
      { name: "Redis", icon: skillIcons["Redis"] }
    ]
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: skillIcons["Docker"] },
      { name: "GitHub Actions", icon: skillIcons["GitHub Actions"] },
      { name: "Vercel", icon: skillIcons["Vercel"] },
      { name: "AWS", icon: skillIcons["AWS"] },
      { name: "CI/CD", icon: skillIcons["CI/CD"] }
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: skillIcons["Git"] },
      { name: "VS Code", icon: skillIcons["VS Code"] },
      { name: "Postman", icon: skillIcons["Postman"] },
      { name: "Figma", icon: skillIcons["Figma"] },
      { name: "Jest", icon: skillIcons["Jest"] }
    ]
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function Skills() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Technical Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillSet) => (
            <motion.div
              key={skillSet.category}
              variants={item}
              className="p-6 rounded-lg bg-secondary/50 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {skillSet.category}
              </h3>
              <ul className="space-y-3">
                {skillSet.items.map((skill) => (
                  <motion.li
                    key={skill.name}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-muted-foreground group"
                  >
                    <div className="relative w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm">{skill.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 
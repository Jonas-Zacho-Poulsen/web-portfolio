"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Skill {
  name: string
  icon: string
  proficiency: number
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
      { name: "React", icon: skillIcons["React"], proficiency: 95 },
      { name: "Next.js", icon: skillIcons["Next.js"], proficiency: 90 },
      { name: "TypeScript", icon: skillIcons["TypeScript"], proficiency: 85 },
      { name: "Tailwind CSS", icon: skillIcons["Tailwind CSS"], proficiency: 90 },
      { name: "Framer Motion", icon: skillIcons["Framer Motion"], proficiency: 80 }
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: skillIcons["Node.js"], proficiency: 85 },
      { name: "tRPC", icon: skillIcons["tRPC"], proficiency: 80 },
      { name: "Prisma", icon: skillIcons["Prisma"], proficiency: 85 },
      { name: "PostgreSQL", icon: skillIcons["PostgreSQL"], proficiency: 80 },
      { name: "Redis", icon: skillIcons["Redis"], proficiency: 75 }
    ]
  },
  {
    category: "DevOps",
    items: [
      { name: "Docker", icon: skillIcons["Docker"], proficiency: 80 },
      { name: "GitHub Actions", icon: skillIcons["GitHub Actions"], proficiency: 85 },
      { name: "Vercel", icon: skillIcons["Vercel"], proficiency: 90 },
      { name: "AWS", icon: skillIcons["AWS"], proficiency: 75 },
      { name: "CI/CD", icon: skillIcons["CI/CD"], proficiency: 80 }
    ]
  },
  {
    category: "Tools",
    items: [
      { name: "Git", icon: skillIcons["Git"], proficiency: 90 },
      { name: "VS Code", icon: skillIcons["VS Code"], proficiency: 95 },
      { name: "Postman", icon: skillIcons["Postman"], proficiency: 85 },
      { name: "Figma", icon: skillIcons["Figma"], proficiency: 80 },
      { name: "Jest", icon: skillIcons["Jest"], proficiency: 85 }
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

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      className="group"
    >
      <div className="flex items-center space-x-3 mb-1">
        <div className="relative w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110">
          <Image
            src={skill.icon}
            alt={skill.name}
            fill
            className="object-contain"
          />
        </div>
        <span className="text-sm text-muted-foreground">{skill.name}</span>
        <span className="text-xs text-primary ml-auto">{skill.proficiency}%</span>
      </div>
      <motion.div
        className="h-1 bg-secondary/50 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>
    </motion.li>
  )
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
              <ul className="space-y-4">
                {skillSet.items.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 
'use client'

import { motion, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface Skill {
  name: string
  icon: string
  proficiency: number
  description?: string
}

interface SkillCategory {
  category: string
  icon?: string
  description?: string
  items: Skill[]
}

const skillIcons = {
  // Backend & Languages
  'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  TypeScript:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  '.NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  PostgreSQL:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg',

  // Frontend
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Tailwind CSS':
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',

  // APIs & Cloud
  Azure: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg',
  Docker:
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg',
  GraphQL:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',

  // Tools & Workflow
  Git: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg',
  'GitHub Actions':
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
  Jira: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg',
  'VS Code':
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg',
}

// Skill descriptions for tooltips
const skillDescriptions: Record<string, string> = {
  'C#': 'Primary language for backend development with .NET',
  TypeScript: 'Type-safe JavaScript for frontend and backend',
  Python: 'Automation, scripting, and data processing',
  '.NET': 'Framework for scalable backend services and APIs',
  'Node.js': 'JavaScript runtime for server-side applications',
  PostgreSQL: 'Relational database for production systems',
  React: 'Library of choice for building interactive UIs',
  'Next.js': 'React framework for production-grade applications',
  'Tailwind CSS': 'Utility-first CSS for rapid UI development',
  'REST APIs': 'Design and implementation of RESTful services',
  GraphQL: 'Query language for flexible API design',
  Azure: 'Cloud platform for hosting and scaling applications',
  Docker: 'Containerization for consistent deployments',
  Git: 'Version control and collaboration',
  'GitHub Actions': 'CI/CD pipelines and automation',
  Jira: 'Agile project management and tracking',
  'VS Code': 'Primary development environment',
}

const skills: SkillCategory[] = [
  {
    category: 'Backend & Platforms',
    icon: skillIcons['.NET'],
    description: 'Core backend technologies for scalable systems',
    items: [
      { name: '.NET', icon: skillIcons['.NET'], proficiency: 85, description: skillDescriptions['.NET'] },
      { name: 'C#', icon: skillIcons['C#'], proficiency: 85, description: skillDescriptions['C#'] },
      { name: 'Python', icon: skillIcons['Python'], proficiency: 75, description: skillDescriptions['Python'] },
      { name: 'Node.js', icon: skillIcons['Node.js'], proficiency: 75, description: skillDescriptions['Node.js'] },
      { name: 'PostgreSQL', icon: skillIcons['PostgreSQL'], proficiency: 80, description: skillDescriptions['PostgreSQL'] },
    ],
  },
  {
    category: 'Frontend',
    icon: skillIcons['React'],
    description: 'Modern frontend frameworks and tooling',
    items: [
      { name: 'React', icon: skillIcons['React'], proficiency: 80, description: skillDescriptions['React'] },
      { name: 'Next.js', icon: skillIcons['Next.js'], proficiency: 80, description: skillDescriptions['Next.js'] },
      { name: 'TypeScript', icon: skillIcons['TypeScript'], proficiency: 80, description: skillDescriptions['TypeScript'] },
      { name: 'Tailwind CSS', icon: skillIcons['Tailwind CSS'], proficiency: 75, description: skillDescriptions['Tailwind CSS'] },
    ],
  },
  {
    category: 'APIs & Integrations',
    icon: skillIcons['Azure'],
    description: 'Building and connecting services',
    items: [
      { name: 'REST APIs', icon: skillIcons['Node.js'], proficiency: 85, description: skillDescriptions['REST APIs'] },
      { name: 'GraphQL', icon: skillIcons['GraphQL'], proficiency: 70, description: skillDescriptions['GraphQL'] },
      { name: 'Azure', icon: skillIcons['Azure'], proficiency: 75, description: skillDescriptions['Azure'] },
      { name: 'Docker', icon: skillIcons['Docker'], proficiency: 75, description: skillDescriptions['Docker'] },
    ],
  },
  {
    category: 'Tools & Workflow',
    icon: skillIcons['Git'],
    description: 'Development and collaboration tools',
    items: [
      { name: 'Git', icon: skillIcons['Git'], proficiency: 85, description: skillDescriptions['Git'] },
      { name: 'GitHub Actions', icon: skillIcons['GitHub Actions'], proficiency: 75, description: skillDescriptions['GitHub Actions'] },
      { name: 'Jira', icon: skillIcons['Jira'], proficiency: 80, description: skillDescriptions['Jira'] },
      { name: 'VS Code', icon: skillIcons['VS Code'], proficiency: 85, description: skillDescriptions['VS Code'] },
    ],
  },
].map(category => ({
  ...category,
  items: [...category.items].sort((a, b) => b.proficiency - a.proficiency),
}))

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

// Tooltip component for skill details
const SkillTooltip = ({ isVisible, description }: { isVisible: boolean; description?: string }) => {
  if (!description || !isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-background/90 backdrop-blur-sm border border-border rounded-md shadow-lg z-10 text-xs"
    >
      {description}
    </motion.div>
  )
}

function SkillItem({ skill }: { skill: Skill }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // List of icons that need a light background in dark mode
  const needsLightBg = [
    'https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  ]

  const needsBackground = needsLightBg.includes(skill.icon)

  return (
    <motion.li
      ref={ref}
      whileHover={{ x: 5 }}
      className="group relative list-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SkillTooltip isVisible={showTooltip} description={skill.description} />

      <div className="flex items-center space-x-3 mb-1">
        <div
          className={`relative w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-125 ${needsBackground ? 'dark:bg-white/90 dark:rounded-full dark:p-0.5' : ''}`}
        >
          <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          {skill.name}
        </span>
        <span className="text-xs text-primary ml-auto font-medium">{skill.proficiency}%</span>
      </div>

      <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </motion.li>
  )
}

// Skill category card with hover effects
function SkillCategory({
  category,
  isActive,
  onClick,
}: {
  category: SkillCategory
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`p-6 rounded-lg backdrop-blur-sm cursor-pointer transition-all duration-300 ${
        isActive
          ? 'bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20'
          : 'bg-secondary/50 border border-border hover:bg-secondary/70'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        {category.icon && (
          <div className="w-8 h-8 flex-shrink-0">
            <img
              src={category.icon}
              alt={category.category}
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <h3 className={`text-xl font-semibold ${isActive ? 'text-primary' : 'text-foreground'}`}>
          {category.category}
        </h3>
      </div>

      {category.description && (
        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
      )}

      <div className="flex flex-wrap gap-2">
        {category.items.slice(0, 5).map(skill => (
          <span
            key={skill.name}
            className="inline-flex items-center gap-1 px-2 py-1 bg-background/50 rounded-full text-xs"
          >
            <img src={skill.icon} alt={skill.name} className="w-3 h-3" />
            {skill.name}
          </span>
        ))}
        {category.items.length > 5 && (
          <span className="inline-flex items-center px-2 py-1 bg-background/50 rounded-full text-xs">
            +{category.items.length - 5} more
          </span>
        )}
      </div>
    </motion.div>
  )
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Set the first category as active by default
  useEffect(() => {
    if (activeCategory === null && skills.length > 0) {
      setActiveCategory(0)
      setSelectedSkills(skills[0].items)
    }
  }, [activeCategory])

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index)
    setSelectedSkills(skills[index].items)

    // Scroll to the skills list on mobile
    if (window.innerWidth < 768 && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={container}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Focused on backend/platform development, APIs, integrations, and reliable delivery in remote-first teams.
          </p>
        </motion.div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {skills.map((category, index) => (
            <SkillCategory
              key={category.category}
              category={category}
              isActive={activeCategory === index}
              onClick={() => handleCategoryClick(index)}
            />
          ))}
        </div>

        {/* Selected skills detail view */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg bg-secondary/30 backdrop-blur-sm border border-border"
        >
          <h3 className="text-xl font-semibold mb-6 text-primary">
            {activeCategory !== null ? skills[activeCategory].category : 'Select a category'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedSkills.map(skill => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

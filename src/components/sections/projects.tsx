"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import { GithubIcon } from "@/components/icons"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  topics: string[]
  stargazers_count: number
  language: string
  screenshots: string[]
  demo_url?: string
  status: "completed" | "in-progress" | "planned"
  tech_stack: {
    name: string
    icon: string
  }[]
  github_stats?: {
    forks: number
    issues: number
    watchers: number
  }
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

// Tech stack icons mapping
const techStackIcons = {
  "next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
}

function ProjectPreview({ title, subtitle, imageUrl }: { title: string; subtitle?: string; imageUrl?: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 text-primary relative overflow-hidden">
      {imageUrl && imageUrl.startsWith("/") ? (
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 flex flex-col items-center justify-center p-4">
            <h4 className="text-xl font-semibold text-white drop-shadow-md">{title}</h4>
            {subtitle && (
              <p className="text-sm mt-2 text-white/80 backdrop-blur-sm bg-black/20 px-2 py-0.5 rounded-full">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-4 h-full w-full bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="rounded-full bg-primary/10 p-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <h4 className="text-xl font-semibold">{title}</h4>
          {subtitle && <p className="text-sm mt-2 text-primary/70">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}

// Updated fallback projects with more details
const fallbackProjects: Repository[] = [
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
    name: "AI Chat Application",
    description: "Real-time chat application with AI integration using OpenAI's GPT models and WebSocket for live updates.",
    html_url: "https://github.com/Jonas-Zacho-Poulsen/ai-chat",
    topics: ["react", "openai", "websocket", "typescript"],
    stargazers_count: 0,
    language: "TypeScript",
    screenshots: [],
    demo_url: "https://ai-chat.jonas-zacho.com",
    status: "in-progress",
    tech_stack: [
      { name: "React", icon: techStackIcons.react },
      { name: "TypeScript", icon: techStackIcons.typescript },
      { name: "Node.js", icon: techStackIcons.nodejs },
      { name: "WebSocket", icon: "" }
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
]

function ProjectCard({ project }: { project: Repository }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const screenshots = project.screenshots || [project.name]
  const status = project.status || "planned"

  // Animation variants for card elements
  const cardVariants = {
    initial: { boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: { boxShadow: "0 20px 25px -5px rgba(var(--primary-rgb), 0.2)" }
  }

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 }
  }

  const buttonVariants = {
    initial: { opacity: 0, y: 10 },
    hover: { opacity: 1, y: 0, transition: { delay: 0.1 } }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === screenshots.length - 1 ? 0 : prev + 1
    )
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    )
  }

  return (
    <motion.div
      variants={item}
      initial="initial"
      whileHover="hover"
      animate={isHovered ? "hover" : "initial"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="rounded-lg glass h-full flex flex-col overflow-hidden transition-all duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Project Screenshots with hover effect */}
      <div className="relative h-52 overflow-hidden">
        <motion.div
          variants={imageVariants}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <ProjectPreview
            title={project.name}
            subtitle={status === "completed" ? "Live Project" : status}
            imageUrl={typeof screenshots[currentImageIndex] === 'string' ? screenshots[currentImageIndex] : undefined}
          />
        </motion.div>

        {/* Status badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm ${
            status === "completed" ? "bg-green-500/20 text-green-400" :
            status === "in-progress" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-blue-500/20 text-blue-400"
          }`}>
            {(status || "planned").replace("-", " ")}
          </span>
        </div>

        {/* Navigation arrows for screenshots */}
        {screenshots.length > 1 && (
          <motion.div
            variants={buttonVariants}
            className="absolute inset-0 flex items-center justify-between p-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={previousImage}
              className="p-2 rounded-full bg-background/70 backdrop-blur-sm text-primary hover:bg-background/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextImage}
              className="p-2 rounded-full bg-background/70 backdrop-blur-sm text-primary hover:bg-background/90 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Project Title */}
        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.name}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech_stack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tech.icon && (
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              )}
              <span className="text-xs">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* GitHub Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <GithubIcon className="w-4 h-4" />
            <span>{project.language}</span>
          </span>
          <div className="flex gap-3">
            <span title="Stars">⭐ {project.stargazers_count}</span>
            <span title="Forks">🔄 {project.github_stats?.forks || 0}</span>
            <span title="Watchers">👀 {project.github_stats?.watchers || 0}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-2">
          <motion.a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(var(--primary-rgb), 0.3)" }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-center text-sm font-medium transition-all"
          >
            <span className="flex items-center justify-center gap-2">
              <GithubIcon className="w-4 h-4" />
              View Code
            </span>
          </motion.a>
          {project.demo_url && (
            <motion.a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(var(--primary-rgb), 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg text-center text-sm font-medium transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                Live Demo
              </span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [projects, setProjects] = useState<Repository[]>(fallbackProjects)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(
          'https://api.github.com/users/Jonas-Zacho-Poulsen/repos?sort=stars&per_page=6'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          // Merge GitHub data with our enhanced project data
          const enhancedProjects = data.map(githubProject => {
            const existingProject = fallbackProjects.find(p => p.name === githubProject.name)
            return existingProject ? {
              ...existingProject,
              stargazers_count: githubProject.stargazers_count,
              github_stats: {
                forks: githubProject.forks_count,
                issues: githubProject.open_issues_count,
                watchers: githubProject.watchers_count
              }
            } : {
              ...githubProject,
              screenshots: [githubProject.name],
              status: "completed" as const,
              tech_stack: [],
              topics: githubProject.topics || []
            }
          })
          setProjects(enhancedProjects)
        }
      } catch (error) {
        console.error('Error fetching projects:', error)
        // Don't set error state, just use fallback projects
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Featured Projects
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
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
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work showcasing my skills and experience in building web applications.
          </p>
        </motion.div>

        {/* Projects grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
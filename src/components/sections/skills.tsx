"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"

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
}

// Skill descriptions for tooltips
const skillDescriptions = {
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
}

const skills: SkillCategory[] = [
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
}))

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

// Tooltip component for skill details
const SkillTooltip = ({ isVisible, description }: { isVisible: boolean, description?: string }) => {
  if (!description || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute left-0 bottom-full mb-2 w-48 p-2 bg-background/90 backdrop-blur-sm border border-border rounded-md shadow-lg z-10 text-xs"
    >
      {description}
    </motion.div>
  );
};

function SkillItem({ skill }: { skill: Skill }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // List of icons that need a light background in dark mode
  const needsLightBg = [
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
    "https://www.svgrepo.com/show/306500/openai.svg"
  ];

  const needsBackground = needsLightBg.includes(skill.icon);

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
        <div className={`relative w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-125 ${needsBackground ? 'dark:bg-white/90 dark:rounded-full dark:p-0.5' : ''}`}>
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{skill.name}</span>
        <span className="text-xs text-primary ml-auto font-medium">{skill.proficiency}%</span>
      </div>

      <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </motion.li>
  )
}

// Skill category card with hover effects
function SkillCategory({ category, isActive, onClick }: {
  category: SkillCategory,
  isActive: boolean,
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
        {category.items.slice(0, 5).map((skill) => (
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
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set the first category as active by default
  useEffect(() => {
    if (activeCategory === null && skills.length > 0) {
      setActiveCategory(0);
      setSelectedSkills(skills[0].items);
    }
  }, [activeCategory]);

  const handleCategoryClick = (index: number) => {
    setActiveCategory(index);
    setSelectedSkills(skills[index].items);

    // Scroll to the skills list on mobile
    if (window.innerWidth < 768 && containerRef.current) {
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

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
            My expertise spans across various technologies and methodologies, allowing me to build complete solutions from concept to deployment.
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
            {activeCategory !== null ? skills[activeCategory].category : "Select a category"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {selectedSkills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}






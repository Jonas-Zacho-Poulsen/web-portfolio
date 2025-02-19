"use client"

import { motion } from "framer-motion"

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
  // Programming Languages
  "C#": "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg",
  "Java": "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
  "JavaScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  "TypeScript": "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  "Python": "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  "SQL": "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
  "HTML5": "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
  
  // Frameworks & Libraries
  "React": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  ".NET": "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg",
  "ASP.NET": "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg",
  "Next.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
  "Tailwind CSS": "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
  "Framer Motion": "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  
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

const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "C#", icon: skillIcons["C#"], proficiency: 95 },
      { name: "JavaScript", icon: skillIcons["JavaScript"], proficiency: 90 },
      { name: "TypeScript", icon: skillIcons["TypeScript"], proficiency: 90 },
      { name: "Python", icon: skillIcons["Python"], proficiency: 90 },
      { name: "Java", icon: skillIcons["Java"], proficiency: 85 },
      { name: "SQL", icon: skillIcons["SQL"], proficiency: 90 },
      { name: "HTML5", icon: skillIcons["HTML5"], proficiency: 90 },
      { name: "CSS3", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", proficiency: 85 }
    ]
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: skillIcons["React"], proficiency: 90 },
      { name: ".NET", icon: skillIcons[".NET"], proficiency: 95 },
      { name: "ASP.NET", icon: skillIcons["ASP.NET"], proficiency: 90 },
      { name: "Next.js", icon: skillIcons["Next.js"], proficiency: 85 },
      { name: "Node.js", icon: skillIcons["Node.js"], proficiency: 85 },
      { name: "Tailwind CSS", icon: skillIcons["Tailwind CSS"], proficiency: 85 },
      { name: "Framer Motion", icon: skillIcons["Framer Motion"], proficiency: 80 },
      { name: "Express.js", icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg", proficiency: 80 }

    ]
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Azure", icon: skillIcons["Azure"], proficiency: 90 },
      { name: "Git", icon: skillIcons["Git"], proficiency: 95 },
      { name: "Docker", icon: skillIcons["Docker"], proficiency: 80 },
      { name: "PostgreSQL", icon: skillIcons["PostgreSQL"], proficiency: 85 },
      { name: "Jira", icon: skillIcons["Jira"], proficiency: 90 },
      // { name: "Confluence", icon: skillIcons["Confluence"], proficiency: 85 },
      // { name: "Trello", icon: skillIcons["Trello"], proficiency: 90 },
      // { name: "Redis", icon: skillIcons["Redis"], proficiency: 80 },
      { name: "Linux", icon: skillIcons["Linux"], proficiency: 85 },
      { name: "Visual Studio", icon: skillIcons["Visual Studio"], proficiency: 90 },
      { name: "Vercel", icon: skillIcons["Vercel"], proficiency: 85 }
    ]
  },
  {
    category: "Methodologies & Practices",
    items: [
      { name: "Agile", icon: skillIcons["Jira"], proficiency: 90 },
      { name: "Scrum", icon: skillIcons["Jira"], proficiency: 90 },
      { name: "Test Automation", icon: skillIcons["Visual Studio"], proficiency: 85 },
      { name: "CI/CD", icon: skillIcons["GitLab"], proficiency: 85 },
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

function SkillItem({ skill }: { skill: Skill }) {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      className="group"
    >
      <div className="flex items-center space-x-3 mb-1">
        <div className="relative w-6 h-6 flex-shrink-0 transition-transform group-hover:scale-110">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain"
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
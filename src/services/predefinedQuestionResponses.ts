export interface PredefinedResponse {
  text: string
  topic: 'experience' | 'skills' | 'projects' | 'contact' | 'default'
}

const predefinedQuestions: Record<string, PredefinedResponse> = {
  // Experience questions
  "What's Jonas' experience?": {
    text: 'Jonas is an experienced full-stack developer with expertise in modern web development. He has worked on various projects including responsive websites, complex web applications and data visualisation. His professional journey includes both freelance and collaborative teamwork, focusing on creating efficient, scalable solutions.',
    topic: 'experience',
  },

  "Tell me about Jonas' background": {
    text: 'Jonas Zacho Poulsen is a passionate full-stack developer from Denmark. He specializes in creating modern, responsive web applications using cutting-edge technologies. With a strong foundation in both frontend and backend development, Jonas has built a diverse portfolio of projects that showcase his technical skills and creative problem-solving abilities.',
    topic: 'experience',
  },

  // Skills questions
  'What technologies does he use?': {
    text: 'Jonas is proficient in a wide range of modern technologies including .NET, Python, React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Node.js, and various databases. He also has experience with cloud platforms, version control (Git), and deployment tools. His tech stack focuses on performance, scalability, and maintainability.',
    topic: 'skills',
  },

  "What are Jonas' strongest skills?": {
    text: "Jonas excels in full-stack web development with particular strength in React and Next.js ecosystems. His key strengths include TypeScript development, responsive design with Tailwind CSS, API integration, database design, and creating seamless user experiences. He's also skilled in problem-solving, project architecture, and modern development workflows.",
    topic: 'skills',
  },

  // Projects questions
  'Show me his projects': {
    text: 'Jonas has developed several impressive projects including this interactive portfolio website, responsive web applications, and various client projects. His work demonstrates expertise in modern web development, user interface design, and full-stack architecture.',
    topic: 'projects',
  },

  // Contact questions
  'How can I contact him?': {
    text: 'Get in Touch with Jonas:📧 Email: jonaszachopoulsen@live.dk📞 Phone: +45 50 22 73 00🐙 GitHub: github.com/Jonas-Zacho-Poulsen🔽 Download CV for more details.',
    topic: 'contact',
  },

  'Is Jonas available for hire?': {
    text: "Yes! Jonas is actively seeking new opportunities and is available for both freelance projects and full-time positions. He's particularly interested in challenging projects that involve modern web technologies and innovative solutions. Contact him at jonaszp97@gmail.com to discuss your project needs.",
    topic: 'contact',
  },

  'What makes Jonas a great developer?': {
    text: 'Jonas combines technical expertise with strong problem-solving skills and attention to detail. He stays current with the latest web technologies, writes clean and maintainable code, and focuses on creating optimal user experiences. His ability to work across the full stack, communicate effectively, and deliver high-quality solutions makes him a valuable team member and reliable developer.',
    topic: 'experience',
  },
}

export function findExactQuestionResponse(question: string): PredefinedResponse | null {
  const normalizedQuestion = question.trim()

  // Try exact match first
  if (predefinedQuestions[normalizedQuestion]) {
    return predefinedQuestions[normalizedQuestion]
  }

  // Try case-insensitive match
  const lowerQuestion = normalizedQuestion.toLowerCase()
  for (const [key, response] of Object.entries(predefinedQuestions)) {
    if (key.toLowerCase() === lowerQuestion) {
      return response
    }
  }

  // Try partial matching for similar questions
  for (const [key, response] of Object.entries(predefinedQuestions)) {
    const keyLower = key.toLowerCase()
    if (keyLower.includes(lowerQuestion) || lowerQuestion.includes(keyLower)) {
      // Only return if there's a substantial match (avoid very short matches)
      if (Math.min(keyLower.length, lowerQuestion.length) > 5) {
        return response
      }
    }
  }

  return null
}

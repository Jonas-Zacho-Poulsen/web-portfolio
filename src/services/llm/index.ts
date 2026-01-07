export type ResponseTopic = 'experience' | 'skills' | 'projects' | 'contact' | 'default'

export type MessageType = 'user' | 'ai'

export interface ResponseType {
  text: string
  topic: ResponseTopic
}

const predefinedResponses: Record<string, ResponseType> = {
  experience: {
    text: 'I have 5+ years of experience in software development, specializing in TypeScript, React, and Node.js. I have worked on both frontend and backend systems, and I am passionate about building scalable and maintainable applications.',
    topic: 'experience',
  },
  skills: {
    text: 'My key skills include TypeScript, React, Node.js, Express, MongoDB, and Docker. I am also proficient in cloud platforms like AWS and Azure, and I follow best practices for code quality and security.',
    topic: 'skills',
  },
  projects: {
    text: 'I have worked on several projects including e-commerce platforms, real-time chat applications, and data visualization tools. Each project has helped me grow my technical skills and problem-solving abilities.',
    topic: 'projects',
  },
  contact: {
    text: 'You can reach me at jonaszp97@gmail.com or connect with me on LinkedIn. I am always open to new opportunities and collaborations.',
    topic: 'contact',
  },
  default: {
    text: 'I am here to help! Feel free to ask me about my experience, skills, or projects.',
    topic: 'default',
  },
}

export const findBestResponse = (message: string): ResponseType => {
  const lowerMessage = message.toLowerCase()

  // Check for specific topics
  if (
    lowerMessage.includes('experience') ||
    lowerMessage.includes('work') ||
    lowerMessage.includes('background')
  ) {
    return predefinedResponses.experience
  }
  if (
    lowerMessage.includes('skills') ||
    lowerMessage.includes('abilities') ||
    lowerMessage.includes('programming language') ||
    lowerMessage.includes('language') ||
    lowerMessage.includes('lang') ||
    lowerMessage.includes('framework') ||
    lowerMessage.includes('technology') ||
    lowerMessage.includes('tech stack') ||
    lowerMessage.includes('tool')
  ) {
    return predefinedResponses.skills
  }
  if (
    lowerMessage.includes('projects') ||
    lowerMessage.includes('portfolio') ||
    lowerMessage.includes('build')
  ) {
    return predefinedResponses.projects
  }
  if (
    lowerMessage.includes('contact') ||
    lowerMessage.includes('email') ||
    lowerMessage.includes('reach') ||
    lowerMessage.includes('phone')
  ) {
    return predefinedResponses.contact
  }

  // Default response
  return predefinedResponses.default
}

export const LLMProvider = {
  sendMessage: async (message: string): Promise<ResponseType> => {
    // Return response immediately without artificial delay
    return findBestResponse(message)
  },
}

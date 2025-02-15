"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  topic?: "experience" | "skills" | "projects" | "contact" | "default"
}

const predefinedResponses = {
  experience: `Jonas is a Full Stack Developer with expertise in modern web technologies. He has experience building scalable applications using Next.js, TypeScript, and various cloud services.`,
  
  skills: `Jonas's key technical skills include:
- Frontend: React, Next.js, TypeScript, Tailwind CSS
- Backend: Node.js, tRPC, Prisma, PostgreSQL
- DevOps: Docker, GitHub Actions, AWS
- Tools: Git, VS Code, Figma`,
  
  projects: `Some of Jonas's notable projects include:
1. Portfolio Website (Next.js 14, TypeScript, Tailwind)
2. AI Chat Application (React, OpenAI, WebSocket)
3. E-commerce Platform (Next.js, tRPC, Prisma)

Each project demonstrates his ability to build modern, scalable applications.`,
  
  contact: `You can reach Jonas through:
- Email: jonaszachopoulsen@live.dk
- Phone: +45 50 22 73 00
- GitHub: github.com/Jonas-Zacho-Poulsen

You can also download his CV from the website for more detailed information.`,

  default: "I'm an AI assistant that can help you learn more about Jonas's experience, skills, and projects. Feel free to ask me anything!"
}

const suggestedQuestions = {
  experience: [
    "What technical skills does Jonas have?",
    "Can you tell me about his projects?",
    "How can I contact Jonas?"
  ],
  skills: [
    "What's Jonas's work experience?",
    "Tell me about his projects",
    "What's the best way to reach him?"
  ],
  projects: [
    "What are his technical skills?",
    "What's his background?",
    "How can I get in touch?"
  ],
  contact: [
    "What's Jonas's experience?",
    "What technologies does he work with?",
    "Tell me about his projects"
  ],
  default: [
    "What's Jonas's background?",
    "What are his technical skills?",
    "Tell me about his projects",
    "How can I contact him?"
  ]
}

function findBestResponse(message: string): { text: string; topic: Message["topic"] } {
  message = message.toLowerCase()
  
  if (message.includes("experience") || message.includes("background") || message.includes("work")) {
    return { text: predefinedResponses.experience, topic: "experience" }
  }
  if (message.includes("skill") || message.includes("technology") || message.includes("tech stack")) {
    return { text: predefinedResponses.skills, topic: "skills" }
  }
  if (message.includes("project") || message.includes("portfolio") || message.includes("build")) {
    return { text: predefinedResponses.projects, topic: "projects" }
  }
  if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("phone")) {
    return { text: predefinedResponses.contact, topic: "contact" }
  }
  
  return { text: predefinedResponses.default, topic: "default" }
}

export function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm Jonas's AI assistant. How can I help you learn more about his experience?",
      sender: "ai",
      timestamp: new Date(),
      topic: "default"
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const response = findBestResponse(userMessage.text)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "ai",
        timestamp: new Date(),
        topic: response.topic
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestedQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const response = findBestResponse(question)
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "ai",
        timestamp: new Date(),
        topic: response.topic
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  // Get the last AI message's topic to determine which suggested questions to show
  const lastAiMessage = [...messages].reverse().find(m => m.sender === "ai")
  const currentTopic = lastAiMessage?.topic || "default"
  const currentSuggestions = suggestedQuestions[currentTopic]

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 w-80 sm:w-96 h-[500px] bg-background border border-border rounded-lg shadow-lg flex flex-col"
          >
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold">AI Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary max-w-[80%] p-3 rounded-lg">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Typing...
                    </motion.div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-2 border-t border-border">
              <div className="flex flex-wrap gap-2 mb-2">
                {currentSuggestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-sm px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary/70 text-primary transition-colors text-left"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Jonas's experience..."
                  className="flex-1 px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:outline-none focus:border-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                >
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </motion.button>
    </div>
  )
} 
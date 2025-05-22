"use client"

import { motion, AnimatePresence, useDragControls } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { create } from 'zustand'
import { chatConfig } from '@/config'
import { LLMProvider } from '@/services/llm'
import { ChatMessage, MessageType } from '@/types'

// Add rate limiting
const RATE_LIMIT_MS = chatConfig.rateLimit || 1000;
let lastMessageTime = 0;

// Use the ChatMessage type from types
type Message = ChatMessage;

// Move predefinedResponses before initialMessage
const predefinedResponses = {
  experience: `Jonas is a Full Stack Developer with experience in building and maintaining scalable applications
   using .NET, Python, Next.js, TypeScript, and various cloud services.`,

  skills: `Jonas' key technical skills include:
- Frontend: React, Next.js, Tailwind CSS
- Backend: .NET, Python, Node.js, TypeScript, PostgreSQL
- Cloud & DevOps: Docker, GitHub Actions, Azure
- Tools: Git, VS Code, Jira`,

  projects: `Some of Jonas' notable projects include:
1. Portfolio Website (Next.js 14, TypeScript, Tailwind)
2. Chat Application (React, OpenAI, WebSocket)`,

  contact: `Get in Touch with Jonas:
📧 Email: jonaszachopoulsen@live.dk
📞 Phone: +45 50 22 73 00
🐙 GitHub: github.com/Jonas-Zacho-Poulsen

🔽 Download CV for more details.`,

  default: "I'm an assistant that can help you learn more about Jonas' experience, skills, and projects. Feel free to ask me anything!"
}

const initialMessage: Message = {
  id: '0',
  text: predefinedResponses.default,
  sender: 'ai',
  timestamp: new Date(),
  topic: 'default',
  provider: 'fallback'
};

const suggestedQuestions = {
  experience: [
    "What technical skills does Jonas have?",
    "Can you tell me about his projects?",
    "How can I contact Jonas?"
  ],
  skills: [
    "What's Jonas' work experience?",
    "Tell me about his projects",
    "What's the best way to reach him?"
  ],
  projects: [
    "What are his technical skills?",
    "What's his background?",
    "How can I get in touch?"
  ],
  contact: [
    "What's Jonas' experience?",
    "What technologies does he work with?",
    "Tell me about his projects"
  ],
  default: [
    "What's Jonas' background?",
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

// Use a proper state management solution
const useChatStore = create<{
  messages: Message[];
  addMessage: (message: Message) => void;
}>((set) => ({
  messages: [initialMessage],
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}));

export function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const { messages, addMessage } = useChatStore();
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const dragControls = useDragControls()
  const [chatSize, setChatSize] = useState({ width: 384, height: 500 }) // Default size (w-96 = 384px)
  const [isResizing, setIsResizing] = useState(false)
  const resizeStartPos = useRef({ x: 0, y: 0 })
  const resizeStartSize = useRef({ width: 0, height: 0 })
  const chatButtonRef = useRef<HTMLButtonElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastMessageTime < RATE_LIMIT_MS) {
      setError("Please wait before sending another message");
      return;
    }
    lastMessageTime = now;

    try {
      if (!inputValue.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date()
      };

      addMessage(userMessage);
      setInputValue("");
      setIsTyping(true);
      setError(null);

      try {
        // Call the chat API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage.text }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response from chat API');
        }

        const data = await response.json();

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.text,
          sender: "ai",
          timestamp: new Date(),
          topic: data.topic as MessageType,
          provider: data.provider as LLMProvider | 'fallback'
        };

        addMessage(aiMessage);
      } catch (apiError) {
        console.error('Chat API error:', apiError);

        // Fallback to predefined responses if API fails
        const fallbackResponse = findBestResponse(userMessage.text);
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: fallbackResponse.text,
          sender: "ai",
          timestamp: new Date(),
          topic: fallbackResponse.topic,
          provider: 'fallback'
        };

        addMessage(fallbackMessage);
        setError("Using fallback responses due to API error");
      } finally {
        setIsTyping(false);
      }
    } catch (err) {
      setError("Failed to process message");
      console.error(err);
      setIsTyping(false);
    }
  };

  const handleSuggestedQuestion = async (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date()
    }

    // Use addMessage from the store instead of setMessages
    addMessage(userMessage)
    setIsTyping(true)
    setError(null)

    try {
      // Call the chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chat API');
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text,
        sender: "ai",
        timestamp: new Date(),
        topic: data.topic as MessageType,
        provider: data.provider as LLMProvider | 'fallback'
      };

      addMessage(aiMessage);
    } catch (apiError) {
      console.error('Chat API error:', apiError);

      // Fallback to predefined responses if API fails
      const fallbackResponse = findBestResponse(question);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse.text,
        sender: "ai",
        timestamp: new Date(),
        topic: fallbackResponse.topic,
        provider: 'fallback'
      };

      addMessage(fallbackMessage);
      setError("Using fallback responses due to API error");
    } finally {
      setIsTyping(false);
    }
  }

  // Resize handlers
  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Capture the pointer to ensure all pointer events go to this element
    (e.target as Element).setPointerCapture(e.pointerId);

    setIsResizing(true);
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
    resizeStartSize.current = { ...chatSize };

    // We'll handle the resize in the pointer events on the element itself
    // rather than adding document-level event listeners
  }

  const handleResize = (e: React.PointerEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeStartPos.current.x;
    const deltaY = e.clientY - resizeStartPos.current.y;

    setChatSize({
      width: Math.max(300, resizeStartSize.current.width + deltaX),
      height: Math.max(400, resizeStartSize.current.height + deltaY)
    });
  }

  const stopResize = (e: React.PointerEvent) => {
    if (!isResizing) return;

    // Release the pointer capture
    (e.target as Element).releasePointerCapture(e.pointerId);

    setIsResizing(false);
  }

  // Function to start drag
  const startDrag = (e: React.PointerEvent) => {
    dragControls.start(e)
  }

  // Get the last AI message's topic to determine which suggested questions to show
  const lastMessage = [...messages].reverse().find(m => m.sender === "ai")
  const currentTopic = lastMessage?.topic || "default"
  const currentSuggestions = suggestedQuestions[currentTopic as keyof typeof suggestedQuestions] || suggestedQuestions.default

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragListener={!isResizing} // Disable drag when resizing
            style={{
              width: chatSize.width,
              height: chatSize.height,
              position: 'relative'
            }}
            className="mb-4 bg-background border border-border rounded-lg shadow-lg flex flex-col"
          >
            <div
              className="p-4 border-b border-border cursor-move flex justify-between items-center"
              onPointerDown={startDrag}
            >
              <div>
                <h3 className="text-lg font-semibold">Assistant</h3>
                {messages.length > 0 && messages[messages.length - 1].provider && (
                  <p className="text-xs text-muted-foreground">
                    {messages[messages.length - 1].provider === 'fallback'
                      ? 'Using predefined responses'
                      : `Powered by ${messages[messages.length - 1].provider}`}
                  </p>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
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
              {error && (
                <div className="mb-2 p-2 text-sm bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded">
                  {error}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Jonas' experience..."
                  className="flex-1 px-4 py-2 rounded-lg bg-secondary/50 border border-border focus:outline-none focus:border-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                  disabled={isTyping}
                >
                  {isTyping ? "..." : "Send"}
                </motion.button>
              </div>
            </form>

            {/* Resize handle */}
            <div
              className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize z-50"
              onPointerDown={startResize}
              onPointerMove={handleResize}
              onPointerUp={stopResize}
              onPointerCancel={stopResize}
              style={{
                touchAction: 'none',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" opacity="0.7" className="absolute bottom-1 right-1">
                <path d="M22 22H16V16H22V22ZM22 13H19V16H16V19H13V22H22V13Z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        ref={chatButtonRef}
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

// Core message types
export type MessageType = 'experience' | 'skills' | 'projects' | 'contact' | 'default';
export type LLMProvider = 'huggingface' | 'ollama' | 'openai' | 'fallback';

// Chat message interface
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  topic?: MessageType;
  provider?: LLMProvider;
}

// LLM Response interface
export interface LLMResponse {
  text: string;
  provider: LLMProvider;
  success: boolean;
  error?: string;
}

// Repository interface (for projects)
export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  screenshots: string[];
  demo_url?: string;
  status: "completed" | "in-progress" | "planned";
  tech_stack: TechStack[];
  github_stats?: GithubStats;
}

export interface TechStack {
  name: string;
  icon: string;
}

export interface GithubStats {
  forks: number;
  issues: number;
  watchers: number;
}

// Skill interfaces
export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  description?: string;
}

export interface SkillCategory {
  category: string;
  icon?: string;
  description?: string;
  items: Skill[];
}

// Contact form interface
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Social links interface
export interface SocialLink {
  name: string;
  value: string;
  icon: React.ComponentType;
  href: string;
}
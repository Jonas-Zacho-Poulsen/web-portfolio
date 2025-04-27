/**
 * Core type definitions for the portfolio website
 * This file centralizes all shared types used across the application
 */

/**
 * Repository/Project type representing a portfolio project
 */
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

/**
 * Technology stack item
 */
export interface TechStack {
  name: string;
  icon: string;
}

/**
 * GitHub repository statistics
 */
export interface GithubStats {
  forks: number;
  issues: number;
  watchers: number;
}

/**
 * Skill definition for the skills section
 */
export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  description?: string;
}

/**
 * Skill category grouping related skills
 */
export interface SkillCategory {
  category: string;
  icon?: string;
  description?: string;
  items: Skill[];
}

/**
 * Social media or contact information
 */
export interface SocialLink {
  name: string;
  value: string;
  icon: React.ComponentType;
  href: string;
}

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * LLM provider types
 */
export type LLMProvider = 'huggingface' | 'ollama' | 'openai';

/**
 * Chat message type for the chat component
 */
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  topic?: MessageType;
  provider?: LLMProvider | 'fallback';
}

/**
 * Message topic types for the chat component
 */
export type MessageType = 'experience' | 'skills' | 'projects' | 'contact' | 'default';

/**
 * Animation variants for Framer Motion
 */
export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
};

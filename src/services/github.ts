// src/services/github.ts - Fixed version

// Import necessary types and utilities
import { Octokit } from '@octokit/rest'

// Define repository type
interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string
  created_at: string
  updated_at: string
  topics: string[]
  stargazers_count: number
  fork: boolean
}

// Define tech stack item type
interface TechStackItem {
  name: string
  icon: string
}

// Define tech stack icons dictionary
const techStackIcons: Record<string, string> = {
  'next.js': '/icons/nextjs.svg',
  typescript: '/icons/typescript.svg',
  react: '/icons/react.svg',
  tailwindcss: '/icons/tailwind.svg',
  nodejs: '/icons/nodejs.svg',
  postgresql: '/icons/postgresql.svg',
  docker: '/icons/docker.svg',
  'c#': '/icons/csharp.svg',
  python: '/icons/python.svg',
  javascript: '/icons/javascript.svg',
  dotnet: '/icons/dotnet.svg',
  azure: '/icons/azure.svg',
  git: '/icons/git.svg',
}

// GitHub service
export class GitHubService {
  private octokit: Octokit
  private username: string

  constructor(username: string) {
    this.username = username
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })
  }

  /**
   * Fetch repositories from GitHub
   * @returns Promise<Repository[]>
   */
  async getRepositories(): Promise<Repository[]> {
    try {
      const { data } = await this.octokit.repos.listForUser({
        username: this.username,
        type: 'owner',
        sort: 'updated',
        per_page: 100,
      })

      // Filter out forked repositories
      const ownRepos = data.filter(repo => !repo.fork)

      return ownRepos as Repository[]
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error)
      return []
    }
  }

  /**
   * Fetch featured repositories
   * @returns Promise<Repository[]>
   */
  async getFeaturedRepositories(): Promise<Repository[]> {
    try {
      const repos = await this.getRepositories()

      // Filter for repositories with the "featured" topic
      const featuredRepos = repos.filter(repo => repo.topics && repo.topics.includes('featured'))

      return featuredRepos
    } catch (error) {
      console.error('Error fetching featured repositories:', error)
      return []
    }
  }

  /**
   * Extract tech stack from repositories
   * @returns Promise<TechStackItem[]>
   */
  async getTechStack(): Promise<TechStackItem[]> {
    try {
      const repos = await this.getRepositories()
      const techStack: TechStackItem[] = []
      const addedTechs = new Set<string>()

      // Extract tech stack from repository languages
      for (const repo of repos) {
        if (!repo.language || addedTechs.has(repo.language.toLowerCase())) {
          continue
        }

        addedTechs.add(repo.language.toLowerCase())

        // Normalize language name for lookup
        const languageKey = repo.language.toLowerCase() as keyof typeof techStackIcons | string

        techStack.push({
          name: repo.language,
          icon:
            languageKey in techStackIcons
              ? techStackIcons[languageKey as keyof typeof techStackIcons]
              : techStackIcons.javascript,
        })
      }

      return techStack
    } catch (error) {
      console.error('Error extracting tech stack:', error)
      return []
    }
  }
}

// Export an instance of the service
export const githubService = new GitHubService(process.env.GITHUB_USERNAME || 'jonas-zacho-poulsen')

export default githubService

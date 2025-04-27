/**
 * GitHub API service
 * Handles all interactions with the GitHub API
 */
import { Repository } from '@/types';
import { fetchWithTimeout } from '@/utils';
import { techStackIcons } from '@/config';

// Default fallback projects if API fails
import { fallbackProjects } from './fallback-data';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'Jonas-Zacho-Poulsen';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Headers for GitHub API requests
 */
const getHeaders = () => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }
  
  return headers;
};

/**
 * Fetches repositories from GitHub API
 * @param limit - Maximum number of repositories to fetch
 * @returns Promise with repositories data
 */
export async function fetchRepositories(limit = 6): Promise<Repository[]> {
  try {
    const response = await fetchWithTimeout(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=${limit}`,
      { headers: getHeaders() }
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data) && data.length > 0) {
      // Merge GitHub data with our enhanced project data
      const enhancedProjects = data.map(githubProject => {
        const existingProject = fallbackProjects.find(p => p.name === githubProject.name);
        
        return existingProject ? {
          ...existingProject,
          stargazers_count: githubProject.stargazers_count,
          github_stats: {
            forks: githubProject.forks_count,
            issues: githubProject.open_issues_count,
            watchers: githubProject.watchers_count
          }
        } : {
          id: githubProject.id,
          name: githubProject.name,
          description: githubProject.description || 'No description provided',
          html_url: githubProject.html_url,
          topics: githubProject.topics || [],
          stargazers_count: githubProject.stargazers_count,
          language: githubProject.language || 'Unknown',
          screenshots: [],
          status: "completed" as const,
          tech_stack: inferTechStack(githubProject),
          github_stats: {
            forks: githubProject.forks_count,
            issues: githubProject.open_issues_count,
            watchers: githubProject.watchers_count
          }
        };
      });
      
      return enhancedProjects;
    }
    
    return fallbackProjects;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return fallbackProjects;
  }
}

/**
 * Infers tech stack from GitHub repository data
 * @param repo - GitHub repository data
 * @returns Inferred tech stack
 */
function inferTechStack(repo: any) {
  const techStack = [];
  
  // Add language if available
  if (repo.language) {
    const languageKey = repo.language.toLowerCase();
    techStack.push({
      name: repo.language,
      icon: techStackIcons[languageKey] || techStackIcons.javascript
    });
  }
  
  // Add technologies from topics
  if (repo.topics && Array.isArray(repo.topics)) {
    repo.topics.forEach((topic: string) => {
      if (techStackIcons[topic]) {
        techStack.push({
          name: topic.charAt(0).toUpperCase() + topic.slice(1),
          icon: techStackIcons[topic]
        });
      }
    });
  }
  
  // Ensure we have at least one tech stack item
  if (techStack.length === 0) {
    techStack.push({
      name: 'JavaScript',
      icon: techStackIcons.javascript
    });
  }
  
  return techStack;
}

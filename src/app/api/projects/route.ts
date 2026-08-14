import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'Jonas-Zacho-Poulsen'

export const revalidate = 3600

export async function GET() {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'web-portfolio',
    }

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`,
      {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API responded with status: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error('Error fetching GitHub projects:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub projects' }, { status: 500 })
  }
}

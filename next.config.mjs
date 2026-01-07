import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Specify workspace root to avoid lockfile detection issues
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
    // Optimize image quality and formats
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600, // Increase cache TTL to 1 hour for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Optimize device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Optimize image sizes
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Enable typed routes (moved out of experimental in Next.js 15+)
  typedRoutes: true,

  // Performance optimizations for Next.js 15+
  experimental: {
    // Configure server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Optimize bundle size by only importing used parts of large packages
    optimizePackageImports: [
      'framer-motion',
      'react-hook-form',
      'zustand',
    ],
  },

  // Configure headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800',
          },
        ],
      },
    ]
  },
}

export default nextConfig

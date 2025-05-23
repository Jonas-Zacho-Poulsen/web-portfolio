/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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

  // Performance optimizations for Next.js 15+
  experimental: {
    // Optimize CSS for production
    optimizeCss: process.env.NODE_ENV === 'production',
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
    // Enable modern JavaScript features
    typedRoutes: true,
    // PPR is only available in canary versions
    // ppr: true,
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

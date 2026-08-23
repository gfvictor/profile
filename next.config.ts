import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: (process.env.ALLOWED_DEV_ORIGINS ?? '').split(','),
  images: {
    qualities: [75, 100],
  },
  async rewrites() {
    return [
      { source: '/gtag/js', destination: 'https://www.googletagmanager.com/gtag/js' },
      { source: '/ga/:path*', destination: 'https://www.google-analytics.com/:path*' },
    ]
  },
}

export default nextConfig

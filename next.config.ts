import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: (process.env.ALLOWED_DEV_ORIGINS ?? '').split(','),
  images: {
    qualities: [75, 100],
  },
}

export default nextConfig

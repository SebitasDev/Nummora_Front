import withPWA from 'next-pwa'
import type { NextConfig } from 'next'

const baseConfig: NextConfig = {
    reactStrictMode: true,

    compiler: {
        emotion: true,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: false,
            },
        ]
    },

    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: '/',
            },
        ]
    },
}

const nextConfig = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
})(baseConfig)

export default nextConfig

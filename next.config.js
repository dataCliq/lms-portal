/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.techmonitor.ai',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;

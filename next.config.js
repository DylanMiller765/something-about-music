/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'somethingaboutmusic.blog',
      },
    ],
    formats: ['image/webp'],
  },
  env: {
    NEXT_PUBLIC_SECURE_POST_TOKEN: process.env.NEXT_PUBLIC_SECURE_POST_TOKEN,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  trailingSlash: true,
};

module.exports = nextConfig;
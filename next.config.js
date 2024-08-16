﻿/** @type {import('next').NextConfig} */
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
    // Custom webpack config for Netlify
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;
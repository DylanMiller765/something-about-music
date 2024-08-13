module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp'],
    },
    env: {
        SECURE_POST_TOKEN: process.env.SECURE_POST_TOKEN,
    },
}
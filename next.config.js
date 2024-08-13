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
    publicRuntimeConfig: {
        NEXT_PUBLIC_SECURE_POST_TOKEN: process.env.NEXT_PUBLIC_SECURE_POST_TOKEN,
    },
}
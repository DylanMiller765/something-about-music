module.exports = {
    basePath: '',
    assetPrefix: '',
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'somethingaboutmusic.blog',
            },
        ],
        formats: ['image/webp'],
        domains: ['localhost'], // Add this line to allow optimization for local images
    },
    publicRuntimeConfig: {
        NEXT_PUBLIC_SECURE_POST_TOKEN: process.env.NEXT_PUBLIC_SECURE_POST_TOKEN,
    },
}
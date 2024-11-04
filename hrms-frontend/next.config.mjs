/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        prependData: `@import "./src/styles/mantine.scss";`,
    },
    images: {
        domains: ['lh3.googleusercontent.com']
    },
};

export default nextConfig;
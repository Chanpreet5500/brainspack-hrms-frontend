/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        prependData: `@import "./src/styles/mantine.scss";`,
    },
};

export default nextConfig;
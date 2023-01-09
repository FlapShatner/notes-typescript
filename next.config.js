/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**/*',
      },
    ],
  },
};

const removeImports = require('next-remove-imports')();


module.exports = removeImports(nextConfig);

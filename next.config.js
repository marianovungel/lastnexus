/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['w7.pngwing.com', 'firebasestorage.googleapis.com'], // Domínios permitidos
  },
}

module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v5.airtableusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },

}

module.exports = nextConfig

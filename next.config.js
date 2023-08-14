/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GRIOTS_API: 'http://localhost:4000/api',
  },
  sassOptions: {
    includePaths: ['./styles'],
  },
}

module.exports = nextConfig

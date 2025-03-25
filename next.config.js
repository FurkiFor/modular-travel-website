const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cdn.imagin.studio',
      }
    ],
    domains: ['localhost']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@miniClient': path.join(__dirname, 'miniClient')
    };

    return config;
  },
  distDir: 'build',
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js']
}

module.exports = nextConfig
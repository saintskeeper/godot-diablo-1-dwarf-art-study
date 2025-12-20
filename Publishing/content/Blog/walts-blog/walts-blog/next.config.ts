import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile next-mdx-remote to fix React 19 compatibility issues
  transpilePackages: ['next-mdx-remote'],

  // Configure allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walts.blog',
      },
    ],
  },
};

export default nextConfig;

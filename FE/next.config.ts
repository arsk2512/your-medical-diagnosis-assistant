import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // appDir: true, // Removed as it is not recognized in ExperimentalConfig
  },
  output: 'standalone', // Important for Vercel + serverless compatibility
};

export default nextConfig;

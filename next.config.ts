import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps catch potential issues in development
  swcMinify: true,       // Faster builds with SWC minifier
  images: {
    domains: ["images.unsplash.com", "cdn.example.com"], // Allow external image domains
    formats: ["image/webp", "image/avif"],              // Modern image formats
  },
  eslint: {
    ignoreDuringBuilds: false, // Ensures linting errors break the build
  },
  typescript: {
    ignoreBuildErrors: false,  // Prevents build when TS errors exist
  },
  experimental: {
    appDir: true,            // Enables the Next.js App Router
    serverActions: true,     // Enables Server Actions (Next.js 13+)
    optimizePackageImports: ["lucide-react", "recharts"], // Optimize imports
  },
  env: {
    NEXT_PUBLIC_API_URL: "https://api.example.com", // Custom environment variable
  },
  compiler: {
    styledComponents: true, // Better support for styled-components
    removeConsole: process.env.NODE_ENV === "production", // Remove console.* in prod
  },
  webpack: (config) => {
    // Example: Add custom alias
    config.resolve.alias["@"] = require("path").resolve(__dirname, "./");
    return config;
  },
};

export default nextConfig;

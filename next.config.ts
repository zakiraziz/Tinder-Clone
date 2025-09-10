import type { NextConfig } from "next";
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps catch potential issues in development
  swcMinify: true,       // Faster builds with SWC minifier
  compress: true,        // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Image optimization
  images: {
    domains: [
      "images.unsplash.com", 
      "cdn.example.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com"
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/documentation',
        permanent: false,
      },
    ];
  },

  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.external.com/:path*',
      },
    ];
  },

  // Build and development settings
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src', 'pages', 'components', 'lib', 'hooks'], // Specify lint directories
  },
  
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json', // Explicit tsconfig path
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || "1.0.0",
  },

  // Compiler options
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: process.env.NODE_ENV !== 'production',
      pure: true,
    },
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    emotion: true, // Enable emotion support
  },

  // Experimental features
  experimental: {
    appDir: true,
    serverActions: {
      allowedOrigins: ['localhost:3000', 'example.com'],
    },
    optimizePackageImports: ["lucide-react", "recharts", "@heroicons/react"],
    optimizeCss: true, // Optimize CSS
    scrollRestoration: true, // Scroll restoration
    workerThreads: true, // Enable worker threads for faster builds
    externalDir: true, // Support for external directories
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom alias
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": require("path").resolve(__dirname, "./src"),
      "@components": require("path").resolve(__dirname, "./src/components"),
      "@utils": require("path").resolve(__dirname, "./src/utils"),
      "@lib": require("path").resolve(__dirname, "./src/lib"),
      "@hooks": require("path").resolve(__dirname, "./src/hooks"),
      "@styles": require("path").resolve(__dirname, "./src/styles"),
    };

    // SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // GraphQL support
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: ['graphql-tag/loader'],
    });

    // Bundle analyzer (development only)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }

    return config;
  },

  // PWA support (optional)
  // pwa: {
  //   dest: 'public',
  //   register: true,
  //   skipWaiting: true,
  // },

  // Internationalization
  i18n: {
    locales: ['en', 'es', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Output configuration (for static export)
  // output: 'export', // Uncomment for static site generation
  
  // Trailing slash configuration
  trailingSlash: false,

  // Base path for deployment in subdirectory
  // basePath: '/docs',

  // Asset prefix for CDN
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.example.com' : '',
};

// Sentry configuration (optional)
const sentryWebpackPluginOptions = {
  silent: true,
  org: "your-org",
  project: "your-project",
};

// Enable Sentry only in production
const configWithSentry = process.env.SENTRY_DSN 
  ? withSentryConfig(nextConfig, sentryWebpackPluginOptions)
  : nextConfig;

export default configWithSentry;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@generative-ui/core": path.resolve(__dirname, "../packages/core/dist"),
    },
  },
  // Ensure webpack can also resolve the package in case Turbopack fallback
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@generative-ui/core": path.resolve(__dirname, "../packages/core/dist"),
    };
    return config;
  },
};

export default nextConfig;

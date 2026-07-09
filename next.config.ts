import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to serve files from /public with no external hostname restrictions
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' ? `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/:path*` : "/api/",
      },
    ];
  },
};

export default nextConfig;

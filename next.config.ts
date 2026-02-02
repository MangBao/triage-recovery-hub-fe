import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable rewrites for API proxy if needed
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:8000/api/:path*',
  //     },
  //   ];
  // },
};

export default nextConfig;

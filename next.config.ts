import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // kitten meow meow >_<
        hostname: 'github.com',
      },
    ],
  },
};

export default nextConfig;

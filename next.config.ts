import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    transpilePackages: ['rdb'],
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    }
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["172.19.160.1"],
  },
};

export default nextConfig;

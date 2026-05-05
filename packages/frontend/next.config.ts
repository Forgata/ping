import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    externalDir: true,
  },
  transpilePackages: ["@ping/backend"],
  /* config options here */
};

export default nextConfig;

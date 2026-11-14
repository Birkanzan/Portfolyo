import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  turbopack: { root: process.cwd() },
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default nextConfig;

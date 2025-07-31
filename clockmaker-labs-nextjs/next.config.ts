import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ics-ikeda.github.io',
      },
      {
        protocol: 'https',
        hostname: 'ics-creative.github.io',
      },
      {
        protocol: 'https',
        hostname: 'clockmaker.jp',
      },
      {
        protocol: 'https',
        hostname: 'clockmaker.jp.blog-en',
      },
      {
        protocol: 'https',
        hostname: 'ics.media',
      },
      {
        protocol: 'https',
        hostname: 'ics-web.jp',
      },
      {
        protocol: 'https',
        hostname: 'codepen.io',
      },
    ],
  },
};

export default nextConfig;

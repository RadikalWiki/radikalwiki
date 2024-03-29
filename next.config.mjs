/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    domains: ['pgvhpsenoifywhuxnybq.storage.eu-central-1.nhost.run'],
  },
};

export default nextConfig;

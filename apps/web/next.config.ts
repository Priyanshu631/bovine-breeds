import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but exclude SVG files
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: { not: /components/ }, // Excludes SVGs that are React components
      },
      // Add a new rule for SVG imports as React components
      {
        test: /\.svg$/i,
        issuer: { and: [/\.(ts|tsx|js|jsx)$/] },
        resourceQuery: /components/, // This is the key: it adds the ?components query
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore SVGs, as they are now handled by SVGR
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;

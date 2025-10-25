import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    // Incluir templates HTML no build
    config.module.rules.push({
      test: /\.html$/,
      type: "asset/resource",
      generator: {
        filename: "static/templates/[name][ext]",
      },
    });

    return config;
  },
};

export default nextConfig;

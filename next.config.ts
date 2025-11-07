import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
};

export default withPWA({
  dest: "public",
  disable: isDev,
  register: true,
})(nextConfig);

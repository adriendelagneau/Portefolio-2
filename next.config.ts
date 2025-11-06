import withPWA from "@ducanh2912/next-pwa";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // your existing config
};

export default withPWA({
  dest: "public",
  disable: isDev,
  register: true,
})(nextConfig);

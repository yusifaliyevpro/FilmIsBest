import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
    qualities: [75, 100],
  },
  experimental: { globalNotFound: true },
  typedRoutes: true,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);

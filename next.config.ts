import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    globalNotFound: true,
    useOffline: true,
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
    qualities: [75, 90, 100],
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    messages: {
      format: "json",
      locales: "infer",
      path: "./messages",
      precompile: true,
    },
  },
});

export default withNextIntl(nextConfig);

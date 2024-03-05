import { baseURL } from "./lib/bases";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: " ",
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}

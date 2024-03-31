import { baseURL } from "./lib/bases";

export default function Robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: " ",
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}

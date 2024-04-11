import { baseURL } from "./lib/bases";

/**
 * Generates a robots.txt configuration object with the specified rules.
 * @returns {Object} A robots.txt configuration object with user agent, disallow rules, and sitemap URL.
 */
export default function Robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: " ",
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}

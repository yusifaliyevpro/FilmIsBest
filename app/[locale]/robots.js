import { BASE_URL } from "../../lib/constants";

export default function Robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: " ",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

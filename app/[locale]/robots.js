import { BASE_URL } from "../../constants";

export default function Robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: " ",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

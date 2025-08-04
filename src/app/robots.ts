import { BASE_URL } from "../lib/constants";
import { MetadataRoute } from "next";

// Robots
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: " ",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

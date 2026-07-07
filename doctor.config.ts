import { defineConfig } from "react-doctor/api";

export default defineConfig({
  ignore: {
    files: ["src/lib/hero.ts", "src/components/animated-text.tsx"],
    rules: [],
  },
  rules: {
    "react-doctor/iframe-missing-sandbox": "off",
  },
});

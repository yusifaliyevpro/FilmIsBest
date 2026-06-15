import { defineConfig } from "react-doctor/api";

export default defineConfig({
  ignore: {
    files: ["lighthouserc.cjs", "src/lib/hero.ts", "src/sanity/components/**"],
  },
});

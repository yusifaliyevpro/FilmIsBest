import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "nextjs", "unicorn", "import", "react", "react-perf"],
  categories: {
    suspicious: "warn",
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
  rules: {
    eqeqeq: "warn",
    "no-throw-literal": "warn",
    "no-underscore-dangle": ["warn", { allow: ["_updatedAt", "_createdAt", "_id", "_type", "_ref"] }],
    "import/no-unassigned-import": [
      "warn",
      { allow: ["**/globals.css", "**/env.server", "dotenv/config", "server-only", "@sanity/client"] },
    ],
    "react/react-in-jsx-scope": "off",
    "unicorn/prefer-node-protocol": "warn",
    "typescript/consistent-type-imports": "warn",
  },
});

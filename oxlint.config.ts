import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "nextjs", "unicorn", "import"],
  categories: {
    suspicious: "warn",
  },
  rules: {
    eqeqeq: "warn",
    "no-throw-literal": "warn",
    "no-underscore-dangle": ["warn", { allow: ["_updatedAt", "_createdAt", "_id", "_type", "_ref"] }],
    "import/no-unassigned-import": "allow",
    "unicorn/prefer-node-protocol": "warn",
    "typescript/consistent-type-imports": "warn",
  },
});

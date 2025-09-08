import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Next.js performance rules
    "next/typescript",      // TypeScript rules for Next.js
    "eslint:recommended",   // General recommended rules
    "plugin:@typescript-eslint/recommended", // TS plugin rules
    "plugin:react-hooks/recommended",        // React hooks rules
    "plugin:prettier/recommended"            // Prettier formatting integration
  ),
  {
    rules: {
      // Strict TypeScript rules
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",

      // React / Next.js rules
      "react/jsx-uses-react": "off", // No longer needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General JS rules
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "eqeqeq": ["error", "always"],
    },
  },
  {
    ignores: [
      "node_modules/",
      ".next/",
      "dist/",
      "build/",
    ],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;

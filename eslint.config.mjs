import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Cosmetic-only in JSX text; no runtime impact. Disabled project-wide.
      "react/no-unescaped-entities": "off",
      // Tracked typing debt (see engines/route session casts). Kept visible as a
      // warning rather than a hard error so it doesn't block CI while the
      // Zod/generateObject migration is pending.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone Node utility scripts (CommonJS, run outside the Next runtime).
    "remove-bg.js",
    "scripts/**",
  ]),
]);

export default eslintConfig;

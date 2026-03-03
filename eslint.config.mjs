import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      // Default ignores of eslint-config-next:
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Version control and editor artifacts:
      ".history/**",
      ".vscode/**",
      "node_modules/**",
      // External RDB library (file:../rdb)
      "lib/rdb/**",
    ],
  },
  {
    rules: {
      // Allow setState in effects for initialization patterns
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);

export default eslintConfig;

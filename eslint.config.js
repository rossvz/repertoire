import js from "@eslint/js"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import reactCompilerPlugin from "eslint-plugin-react-compiler"
import globals from "globals"

export default [
  {
    ignores: ["node_modules/**", "build/**", "dist/**"],
  },
  // Base ESLint recommended rules
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-compiler": reactCompilerPlugin,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // JavaScript best practices
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "prefer-const": "warn",
      "no-var": "error",
      "eqeqeq": ["error", "always", { null: "ignore" }],
      "no-eval": "error",
      "no-implied-eval": "error",
      "curly": ["warn", "multi-line"],

      // React Compiler
      "react-compiler/react-compiler": "error",

      // React best practices
      "react/react-in-jsx-scope": "off", // Not needed in React 19
      "react/prop-types": "off",
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/no-children-prop": "error",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "warn",
      "react/no-direct-mutation-state": "error",
      "react/no-unescaped-entities": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-boolean-value": ["warn", "never"],
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  // Test files configuration
  {
    files: ["**/*.test.js", "**/*.test.jsx", "**/*.spec.js", "**/*.spec.jsx"],
    languageOptions: {
      globals: {
        ...globals.node,
        it: "readonly",
        describe: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
  },
]

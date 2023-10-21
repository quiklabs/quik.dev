/** @type {import('eslint').Linter.Config} */

module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ["standard-with-typescript", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": ["error", { printWidth: 120 }],
    // typescript
    "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "separate-type-imports" }],
    "@typescript-eslint/consistent-type-exports": ["error", { fixMixedExportsWithInlineTypeSpecifier: false }],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
  },
  overrides: [
    {
      files: [".eslintrc.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      parserOptions: {
        sourceType: "module",
      },
    },
  ],
};

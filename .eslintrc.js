import unusedImports from "eslint-plugin-unused-imports";

export default {
  plugins: ["unused-imports"], // Specify plugin name directly
  rules: {
    "no-unused-vars": "off", // Turn off default rule
    "@typescript-eslint/no-unused-vars": "off", // Disable TypeScript-specific unused-vars rule
    "unused-imports/no-unused-imports": "error", // Report unused imports as errors
    "unused-imports/no-unused-vars": [
      "warn", // Warn about unused variables
      {
        vars: "all", // Check all variables
        varsIgnorePattern: "^_", // Ignore variables starting with "_"
        args: "after-used", // Check arguments used after the specified variable
        argsIgnorePattern: "^_", // Ignore arguments starting with "_"
      },
    ],
  },
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"], // Add recommended TypeScript rules
};
// {

  
//     "rules": {
//       "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }]
//     },
//     // "plugins": ["no-unused-imports"],
  
//   "extends": ["next/core-web-vitals", "next/typescript"]
// }

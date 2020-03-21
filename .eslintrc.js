module.exports = {
  "extends": ["standard-with-typescript", "prettier/@typescript-eslint", "prettier"],
  "parserOptions": {
    "project": "tsconfig.json"
  },
  "rules": {
    "@typescript-eslint/no-extraneous-class": ["off"],
    "@typescript-eslint/no-floating-promises": ["off"],
    "@typescript-eslint/prefer-readonly": ["off"],
    "@typescript-eslint/strict-boolean-expressions": ["off"],
    "@typescript-eslint/no-useless-constructor": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    // "no-console": ["error", { "allow": ["warn", "error"] }],
    "eol-last": ["error", "always"],
    "no-caller": ["error"],
    "no-bitwise": ["error"],
    "no-debugger": ["error"],
    "@typescript-eslint/no-empty-interface": ["error"],
    "no-eval": ["error"],
    "no-var": ["error"],
    "no-use-before-define": ["error"],
    "radix": ["error", "always"],
    "eqeqeq": ["error", "always"],
    "dot-notation": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/restrict-plus-operands": "warn",
    "@typescript-eslint/promise-function-async": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/consistent-type-assertions": ["error", {
      "assertionStyle": "as",
      "objectLiteralTypeAssertions": "allow-as-parameter"
    }],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-misused-promises": "off"
  }
};

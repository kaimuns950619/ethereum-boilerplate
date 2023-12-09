module.exports = {
  extends: ['@moralisweb3', 'plugin:@next/next/recommended', 'plugin:cypress/recommended'],
  ignorePatterns: ['**/build/**/*'],
  rules: {
	"complexity": "off",
	"no-mixed-spaces-and-tabs": "off",
	"@typescript-eslint/no-explicit-any": "off",
    'no-console': 'off',
  },
};
const { configure, presets } = require('eslint-kit')

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',
  parser: '@typescript-eslint/parser',
  root: true,
  ignorePatterns: ['dist', '.eslintrc.cjs', 'routeTree.gen.ts'],
  extends: ['plugin:@tanstack/eslint-plugin-query/recommended'],
  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react(),
  ],
})

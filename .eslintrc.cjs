const { configure, presets } = require('eslint-kit')

module.exports = configure({
  allowDebug: process.env.NODE_ENV !== 'production',
  extend: {
    root: true,
    ignorePatterns: ['dist', '.eslintrc.cjs', 'routeTree.gen.ts'],
    extends: ['plugin:@tanstack/eslint-plugin-query/recommended'],
    parserOptions: {
      project: ['./tsconfig.app.json', './tsconfig.node.json'],
    },
  },
  presets: [
    presets.imports(),
    presets.node(),
    presets.prettier(),
    presets.typescript(),
    presets.react(),
  ],
})

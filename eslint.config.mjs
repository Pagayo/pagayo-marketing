import eslint from '@eslint/js';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '*.config.*',
      '**/*.astro', // Skip Astro files - use Astro's built-in checking
      '**/*.ts', // Skip TypeScript - use `astro check` for type checking
    ],
  },
  // JavaScript files only
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },
];

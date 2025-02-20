/* eslint-disable @typescript-eslint/no-require-imports */

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const jsonc = require('eslint-plugin-jsonc');
const importSort = require('eslint-plugin-simple-import-sort');

module.exports = tseslint.config(
  {
    files: ['src/**/*.ts', 'app.js', 'eslint.config.js'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    plugins: {
      'simple-import-sort': importSort,
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['src/**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    files: [
      '.vscode/**/*.json',
      'src/**/*.js',
      '.prettierrc.json',
      'angular.json',
      'tsconfig.app.json',
      'tsconfig.json',
      'tsconfig.spec.json',
    ],
    extends: [...jsonc.configs['flat/recommended-with-json']],
    rules: {
      'jsonc/no-comments': 'error',
      'jsonc/sort-keys': 'error',
    },
  },
);

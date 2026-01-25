import { createAngularConfigs } from '@chris.araneo/eslint-config';

const PREFIX = 'app';
const SOURCES = ['**/*.ts', '!**/*.spec.ts'];
const TEMPLATES = ['**/*.html'];
const JSONS = ['**/*.json'];
const IGNORED = [
  '**/node_modules/**',
  '**/dist/**',
  '**/out/**',
  '**/build/**',
  'src/test-setup.ts',
  'src/polyfills.ts',
];

export default createAngularConfigs(PREFIX, SOURCES, TEMPLATES, JSONS, IGNORED);

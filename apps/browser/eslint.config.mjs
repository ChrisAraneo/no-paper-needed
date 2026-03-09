import baseConfig from '../../eslint.base.config.mjs';
import { configBuilder } from '@chris.araneo/eslint-config';

const PREFIX = 'app';
const SOURCES = [/^(?!.*\.spec\.ts$).*\.ts$/.toString()];
const TESTS = ['**/*.spec.ts'];
const TEMPLATES = ['**/*.html'];
const JSONS = ['**/*.json'];
const IGNORED = [
  '**/node_modules/**',
  '**/dist/**',
  '**/out/**',
  '**/build/**',
  'eslint.config.mjs',
  'src/test-setup.ts',
  'src/polyfills.ts',
  'environments/**/*.ts',
];

export default configBuilder()
  .addAngularConfig({
    prefix: PREFIX,
    sources: SOURCES,
    tests: TESTS,
    templates: TEMPLATES,
    jsons: JSONS,
    ignored: IGNORED,
  })
  .build();

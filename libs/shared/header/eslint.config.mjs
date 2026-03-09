import { configBuilder } from '@chris.araneo/eslint-config';

const PREFIX = 'npn';
const SOURCES = [/^(?!.*\.spec\.ts$).*\.ts$/.toString()];
const TESTS = ['**/*.spec.ts'];
const TEMPLATES = ['**/*.html'];
const JSONS = ['**/*.json'];
const IGNORED = ['eslint.config.mjs', 'vite.config.mts', 'src/test-setup.ts'];

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

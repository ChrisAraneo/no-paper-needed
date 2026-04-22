import { configBuilder } from '@chris.araneo/eslint-config';

export default configBuilder()
  .addAngularConfig({
    prefix: 'npn',
    sources: ['**/*.ts', '!**/*.spec.ts'],
    tests: ['**/*.spec.ts'],
    templates: ['**/*.html'],
    jsons: ['**/*.json'],
    ignored: ['eslint.config.mjs'],
    tsconfigRootDir: import.meta.dirname,
  })
  .build();

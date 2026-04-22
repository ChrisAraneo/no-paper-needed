import { configBuilder } from '@chris.araneo/eslint-config';

export default configBuilder()
  .addAngularConfig({
    prefix: 'app',
    sources: ['**/*.ts', '!**/*.spec.ts'],
    tests: ['**/*.spec.ts'],
    templates: ['**/*.html'],
    jsons: ['**/*.json'],
    ignored: [
      'eslint.config.mjs',
      'src/test-setup.ts',
      'src/polyfills.ts',
      'environments/**/*.ts',
    ],
    tsconfigRootDir: import.meta.dirname,
  })
  .build();

import { configBuilder } from '@chris.araneo/eslint-config';

export default configBuilder()
  .addAngularConfig({
    prefix: 'npn',
    sources: [/^(?!.*\.spec\.ts$).*\.ts$/.toString()],
    tests: ['**/*.spec.ts'],
    templates: ['**/*.html'],
    jsons: ['**/*.json'],
    ignored: ['eslint.config.mjs', 'vite.config.mts', 'src/test-setup.ts'],
  })
  .build();


import { configBuilder } from '@chris.araneo/eslint-config';

export default configBuilder()
  .addTypeScriptConfig({
    sources: ['**/*.ts', '!**/*.spec.ts'],
    tsconfigRootDir: import.meta.dirname,
  })
  .addJsonConfig({
    jsons: ['**/*.json'],
    tsconfigRootDir: import.meta.dirname,
  })
  .addIgnored({
    ignored: ['eslint.config.mjs', 'vite.config.mts', 'src/test-setup.ts'],
  })
  .build();

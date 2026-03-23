import { configBuilder } from '@chris.araneo/eslint-config';

export default configBuilder()
  .addTypeScriptTestsConfig({
    sources: ['**/*.spec.ts'],
    tsconfigRootDir: import.meta.dirname,
  })
  .build();

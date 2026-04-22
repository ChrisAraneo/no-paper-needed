import { configBuilder } from '@chris.araneo/eslint-config';

const SOURCES = ['**/*.ts', '!**/*.spec.ts'];
const JSONS = ['**/*.json'];
const IGNORED = [];

export default configBuilder()
  .addTypeScriptConfig({
    sources: SOURCES,
  })
  .addJsonConfig({
    jsons: JSONS,
  })
  .addIgnored({
    ignored: IGNORED,
  })
  .build();

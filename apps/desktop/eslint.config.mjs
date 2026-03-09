import baseConfig from '../../eslint.base.config.mjs';
import { configBuilder } from '@chris.araneo/eslint-config';

const SOURCES = [/^(?!.*\.spec\.ts$).*\.ts$/.toString()];
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

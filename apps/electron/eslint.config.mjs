import {
  createTypeScriptConfigs,
  createJsonConfigs,
} from '@chris.araneo/eslint-config';

const JSONS = ['**/*.json'];
const SOURCES = ['**/*.ts', '!**/*.spec.ts'];

export default [
  ...createJsonConfigs(JSONS),
  ...createTypeScriptConfigs(SOURCES),
];

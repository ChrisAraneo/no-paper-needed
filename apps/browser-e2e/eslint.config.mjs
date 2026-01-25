import {
  createTypeScriptTestsConfigs,
  createJsonConfigs,
} from '@chris.araneo/eslint-config';

const JSONS = ['**/*.json'];
const TESTS = ['**/*.ts'];

export default [
  ...createJsonConfigs(JSONS),
  ...createTypeScriptTestsConfigs(TESTS),
];

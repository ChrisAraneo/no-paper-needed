import {
  createJsonConfigs,
  createTypeScriptConfigs,
  createNxConfigs,
} from '@chris.araneo/eslint-config';

const JSONS = ['.vscode/*.json', 'tools/**/*.json', '*.json'];

const SOURCES = ['tools/**/*.js', 'tools/**/*.ts'];

const IGNORED = ['package.json', 'package-lock.json'];

export default [
  ...createNxConfigs(SOURCES),
  ...createJsonConfigs(JSONS),
  ...createTypeScriptConfigs(SOURCES),
  {
    ignores: IGNORED,
  },
];

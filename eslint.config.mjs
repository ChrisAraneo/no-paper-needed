import createConfig from '@chris.araneo/eslint-config';

const JSONS = [
  '.vscode/*.json',
  'public/**/*.json',
  'e2e/**/*.json',
  'src/**/*.json',
  'app/**/*.json',
  '.prettierrc.json',
  'angular.json',
  'electron-builder.json',
  'tsconfig.json',
  'tsconfig.serve.json',
];

const SOURCES = [
  'src/**/*.ts',
  '!src/**/*.spec.ts',
  'app/main.ts',
  'e2e/**/*.ts',
  '!e2e/**/*.spec.ts',
];

const TESTS = ['**/*.spec.ts'];

const HTMLS = ['src/**/*.html'];

const IGNORED = [
  '.angular/**/*',
  'app/main.js',
  'app/main.js.map',
  'node_modules/**/*',
  'dist/**/*',
  'reports/**/*',
  '**/package.json',
  '**/package-lock.json',
];

export default createConfig({
  jsons: JSONS,
  sources: SOURCES,
  tests: TESTS,
  templates: HTMLS,
  angularElementPrefix: 'app',
  ignored: IGNORED,
  isAngularApp: true,
});

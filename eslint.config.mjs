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
];

const SOURCES = [
  'src/**/*.ts',
  '!src/**/*.spec.ts',
  'app/main.ts',
  'e2e/**/*.ts',
  '!e2e/**/*.spec.ts',
];

const TESTS = ['**/*.spec.ts'];

const TEMPLATES = ['src/**/*.html'];

const IGNORED = [
  '.angular/**/*',
  'app/main.js',
  'app/main.js.map',
  'node_modules/**/*',
  'dist/**/*',
  'reports/**/*',
  '**/package.json',
  '**/package-lock.json',
  'eslint.config.mjs',
];


const config = createConfig({
  jsons: JSONS,
  sources: SOURCES,
  tests: TESTS,
  templates: TEMPLATES,
  ignored: IGNORED,
  isAngularApp: true,
  angularElementPrefix: 'app',
});

export default config.map(conf => {
  if (conf.files?.some(file => file.includes('*.html'))) {
    return {
      ...conf,
      rules: {
        ...conf.rules,
        '@angular-eslint/template/no-call-expression': 'off'
      }
    };
  }
  return conf;
});
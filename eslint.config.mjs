import createConfig from '@chris.araneo/eslint-config';

const jsons = [
  '.vscode/*.json',
  'public/**/*.json',
  'e2e/**/*.json',
  'src/**/*.json',
  '.prettierrc.json',
  'angular.json',
  'electron-builder.json',
  'tsconfig.json',
  'tsconfig.serve.json',
];

const sources = ['src/**/*.ts', '!src/**/*.spec.ts', 'app/main.ts', 'e2e/**/*.ts', '!e2e/**/*.spec.ts'];

const tests = ['**/*.spec.ts'];

const htmls = ['src/**/*.html'];

const ignored = [
  '.angular/**/*',
  'app/main.js',
  'app/main.js.map',
  'node_modules/**/*',
  'dist/**/*',
  'reports/**/*',
  'package.json',
  'package-lock.json',
];

const config = createConfig(jsons, sources, tests, htmls, ignored);

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
  
  if (conf.files?.some(file => file.includes('*.ts'))) {
    return {
      ...conf,
      languageOptions: {
        ...conf.languageOptions,
        parserOptions: {
          ...conf.languageOptions?.parserOptions,
          project: [
            './tsconfig.serve.json',
            './src/tsconfig.app.json',
            './src/tsconfig.spec.json',
            './e2e/tsconfig.e2e.json'
          ],
          createDefaultProgram: true
        }
      }
    };
  }
  
  return conf;
});

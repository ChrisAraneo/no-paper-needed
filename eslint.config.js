import createConfigs from '@chris.araneo/eslint-config';

export default createConfigs({
  jsons: ['**/*.json'],
  sources: ['src/**/!(*spec).ts'],
  tests: ['src/**/*.spec.ts'],
  templates: ['src/**/*.html'],
  isAngularApp: true,
  angularElementPrefix: 'npn',
});

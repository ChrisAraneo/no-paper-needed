import { configBuilder } from '@chris.araneo/eslint-config';

const JSONS = ['**/*.json'];
const IGNORED = [
  '.angular/',
  '.nx/cache/',
  '.nx/workspace-data/',
  'apps/',
  'libs/',
  'node_modules/',
  'eslint.config.mjs',
  'package.json',
  'package-lock.json',
];
const NX_RULES_CONFIG = {
  dependencyChecks: {
    buildTargets: ['build'],
    checkMissingDependencies: true,
    checkObsoleteDependencies: true,
    checkVersionMismatches: true,
    ignoredDependencies: [],
  },
  enforceModuleBoundaries: {
    allow: [],
    allowCircularSelfDependency: true,
    depConstraints: [
      {
        sourceTag: '*',
        onlyDependOnLibsWithTags: ['*'],
      },
    ],
    enforceBuildableLibDependency: true,
  },
};

// TODO Handle undefined sources
// TODO Handle undefined jsons
// TODO Add module nx boundaries rules

export default configBuilder()
  .addNxConfig({ sources: [], rulesConfig: NX_RULES_CONFIG })
  .addJsonConfig({ jsons: JSONS })
  .addIgnored({ ignored: IGNORED })
  .build();

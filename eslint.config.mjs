import { configBuilder } from '@chris.araneo/eslint-config';

const JSONS = ['**/*.json'];
const IGNORED = ['.nx/cache/', '.nx/workspace-data/', 'apps/', 'libs/', 'node_modules/', 'package.json', 'package-lock.json'];

// TODO Handle undefined sources
// TODO Handle undefined jsons
// TODO Add module nx boundaries rules

export default configBuilder().addNxConfig({ sources: [] }).addJsonConfig({ jsons: JSONS }).addIgnored({ ignored: IGNORED }).build();

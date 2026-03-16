import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|mdx)'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  addons: [],
};

export default config;


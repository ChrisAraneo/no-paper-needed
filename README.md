<h1 align="center">No Paper Needed</h1>

<p align="center">
  <!-- <img src="todo" alt="todo" width="256px" height="256px"/>
  <br> -->
  <a href="https://github.com/ChrisAraneo/no-paper-needed/blob/master/package.json"><img src="https://img.shields.io/badge/version-v0.0.0-blue" alt="version"></a>
  <a href="https://github.com/ChrisAraneo/no-paper-needed/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="@chris.araneo/no-paper-needed is released under the MIT license."></a>
  <a href="https://github.com/ChrisAraneo/no-paper-needed/actions/workflows/ci.yml"><img alt="GitHub CI Status" src="https://img.shields.io/github/actions/workflow/status/ChrisAraneo/no-paper-needed/ci.yml?label=CI&logo=GitHub"></a>
  <br>
  <br>
  <em>Simple note-taking app powered by Angular and Electron</em>
  <br>
</p>

## WIP

This app & README is a work in progress

Polish name of this app will be something like "Notatki Bez Kartki"

## Storybook

Storybook is a tool for developing UI components in isolation. Instead of navigating through your full app to find a button in a dialog, you open Storybook and see every button variant immediately.

* Story - a single rendered state of a component (e.g. "Disabled button")
* Meta - the default configuration for all stories of a component (title, argTypes, etc.)
* Args - the inputs (Angular @Input values) you pass to a story; editable in the Controls panel
* ArgTypes - describes the controls shown in the Storybook UI (dropdowns, toggles, text fields)
* Tags - `['autodocs']` auto-generates a documentation page from your stories

Example story file:

```
const meta: Meta<ButtonComponent> = {
  title: 'Shared/Button',       // sidebar path
  component: ButtonComponent,   // the Angular component
  tags: ['autodocs'],           // auto-generate docs
  argTypes: { /* control configs */ },
};
export default meta;

export const Default: Story = {
  args: { label: 'Click me' },  // input values for this story
};
```

What you can do in the Storybook UI?

* Controls panel - change inputs live and see the component re-render
* Actions panel - see output events (like clicked) being fired
* Docs tab - auto-generated documentation with all stories shown inline
* Viewport toolbar - test how the component looks at different screen sizes

### Development server

```
npx nx run button:storybook
```

This starts the Storybook dev server at http://localhost:6006. It hot-reloads when you change stories or component code.

### Static bnuild

```
npx nx run button:build-storybook
```

Outputs a static Storybook site to  dist/storybook/button/ - useful for deploying or sharing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Krzysztof Pająk (Chris Araneo) - chris.araneo@gmail.com

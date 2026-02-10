import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const createPalette = (
  hue: number,
  saturation: number,
  baseLightness: number,
  lightnessStep: number,
): Record<number, string> =>
  [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].reduce(
    (acc, shade) => {
      acc[shade] = `hsl(${hue}, ${saturation}%, ${
        baseLightness + ((600 - shade) / 100) * lightnessStep
      }%)`;
      return acc;
    },
    {} as Record<number, string>,
  );

const definePrimary = () => {
  const hue = 33;
  const saturation = 80;
  const baseLightness = 50;
  const lightnessStep = 9.8;

  return createPalette(hue, saturation, baseLightness, lightnessStep);
};

const defineLightSurface = () => {
  const hue = 33;
  const saturation = 3;
  const baseLightness = 42;
  const lightnessStep = 9.8;

  return createPalette(hue, saturation, baseLightness, lightnessStep);
};

const defineDarkSurface = () => {
  const hue = 33;
  const saturation = 3;
  const baseLightness = 42;
  const lightnessStep = 9.8;

  return createPalette(hue, saturation, baseLightness, lightnessStep);
};

const PRESET = definePreset(Aura, {
  semantic: {
    primary: definePrimary(),
    colorScheme: {
      light: {
        surface: defineLightSurface(),
      },
      dark: {
        surface: defineDarkSurface(),
      },
    },
  },
});

export const THEME = {
  preset: PRESET,
  options: {
    prefix: 'npn',
  },
};

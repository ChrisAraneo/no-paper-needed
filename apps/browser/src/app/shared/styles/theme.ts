import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const PRESET = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'hsl(30, 3%, 0%)',
      100: 'hsl(30, 3%, 0%)',
      200: 'hsl(30, 3%, 0%)',
      300: 'hsl(30, 3%, 10%)',
      400: 'hsl(30, 3%, 20%)',
      500: 'hsl(30, 3%, 30%)',
      600: 'hsl(30, 3%, 40%)',
      700: 'hsl(30, 3%, 50%)',
      800: 'hsl(30, 3%, 60%)',
      900: 'hsl(30, 3%, 70%)',
      950: 'hsl(30, 3%, 85%)',
    },
    colorScheme: {
      light: {
        surface: {
          0: 'hsl(33, 33%, 100%)',
          50: 'hsl(33, 33%, 95%)',
          100: 'hsl(33, 33%, 90%)',
          200: 'hsl(33, 33%, 85%)',
          300: 'hsl(33, 33%, 75%)',
          400: 'hsl(33, 33%, 65%)',
          500: 'hsl(33, 33%, 55%)',
          600: 'hsl(33, 33%, 45%)',
          700: 'hsl(33, 33%, 35%)',
          800: 'hsl(33, 33%, 30%)',
          900: 'hsl(33, 33%, 25%)',
          950: 'hsl(33, 33%, 25%)',
        },
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

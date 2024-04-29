import { createTheme } from '@mui/material/styles';
import { colors } from 'utils/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.DARK_BLUE,
    },
    secondary: {
      main: colors.LIGHT_BLUE,
    },
    error: {
      main: colors.RED,
    },
    background: {
      default: '#fff',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.LIGHT_BLUE,
    },
    secondary: {
      main: colors.DARK_BLUE,
    },
    error: {
      main: colors.RED,
    },
    background: {
      default: '#282c34',
    },
  },
});

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: lightTheme.palette.background.default,
        },
      },
    },
  },
  palette: {
    mode: 'light',
    primary: lightTheme.palette.primary,
    secondary: lightTheme.palette.secondary,
    error: lightTheme.palette.error,
    background: lightTheme.palette.background,
  },
});

export default theme;

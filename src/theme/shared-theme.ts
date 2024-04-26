import { createTheme } from '@mui/material/styles';
import { colors } from 'utils/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.darkBlue,
    },
    secondary: {
      main: colors.lightBlue,
    },
    error: {
      main: colors.red,
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
      main: colors.lightBlue,
    },
    secondary: {
      main: colors.darkBlue,
    },
    error: {
      main: colors.red,
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

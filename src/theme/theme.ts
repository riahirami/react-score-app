import { createTheme } from '@mui/material/styles';
import darkTheme from './theme.dark';
import lightTheme from './theme.light';
import { ThemeEnum } from 'utils/enum';

const generateTheme = (mode: ThemeEnum) => {
  switch (mode) {
    case ThemeEnum.LIGHT: {
      return createTheme(lightTheme);
    }
    case ThemeEnum.DARK: {
      return createTheme(darkTheme);
    }
    default: {
      return createTheme(lightTheme);
    }
  }
};

export default generateTheme;

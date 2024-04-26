import { Router } from 'routes';
import './assets/sass/common.scss';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import generateTheme from 'theme/theme';
import { Grid } from '@mui/material';

function App() {
  const { themeMode } = useThemeModeSwitch();
  const theme = useMemo(() => generateTheme(themeMode), [themeMode]);
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;

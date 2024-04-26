import { Router } from 'routes';
import './assets/sass/common.scss';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import generateTheme from 'theme/theme';

function App() {
  const { themeMode } = useThemeModeSwitch();
  const theme = useMemo(() => generateTheme(themeMode), [themeMode]);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;

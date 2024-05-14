import { Router } from 'routes';
import './assets/sass/common.scss';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useMemo } from 'react';
import generateTheme from 'theme/theme';
import { firebaseConfig } from 'config/firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
function App() {
  const { themeMode } = useThemeModeSwitch();
  const theme = useMemo(() => generateTheme(themeMode), [themeMode]);
  const db = getDatabase();

  useEffect(() => {
    const firebaseApp = initializeApp(firebaseConfig);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;

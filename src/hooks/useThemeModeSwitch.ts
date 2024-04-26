import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { ThemeEnum } from 'utils/enum';
import { persistData } from 'utils/helpers/storage.helpers';

interface useThemeModeSwitchProps {
  themeMode: ThemeEnum;
  handleThemeModeChange: () => void;
}

const useThemeModeSwitch = (): useThemeModeSwitchProps => {
  const [themeMode, setThemeMode] = useState(ThemeEnum.LIGHT);
  const myTheme = useTheme();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setThemeMode(theme as ThemeEnum);
    }
  }, []);

  const handleThemeModeChange = () => {
    const newThemeMode = themeMode === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    setThemeMode(newThemeMode);
    persistData('theme', newThemeMode);
    myTheme.palette.mode = newThemeMode;
  };

  return { themeMode, handleThemeModeChange };
};

export default useThemeModeSwitch;

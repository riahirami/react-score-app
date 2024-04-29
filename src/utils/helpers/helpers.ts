import { Theme } from '@mui/material';
import { colors } from 'utils/colors';
import { ThemeEnum } from 'utils/enum';

export const gridBreakPointsBasedOnPlayerNumber = (
  isMiddleGrid: boolean | undefined,
  playersNumber: number,
) => {
  if (!isMiddleGrid) {
    return 3;
  } else if (playersNumber === 2) {
    return 3;
  } else if (playersNumber === 3) {
    return 2;
  } else if (playersNumber === 4) {
    return 1.5;
  }
};

export const getPendingRoundColor = (pendingRound: boolean, theme: Theme) => {
  if (pendingRound) {
    if (theme.palette.mode === ThemeEnum.DARK) {
      return colors.WHITE_GREY;
    }
    return theme.palette.grey[300];
  }
  return 'transparent';
};

export const getButtonBackgroundColor = (
  disabled: boolean | undefined,
  theme: Theme,
): {
  simple: string;
  hover: string;
} => {
  const themeMode = theme.palette.mode;
  switch (true) {
    case themeMode === ThemeEnum.DARK && disabled:
      return { simple: theme.palette.grey[800], hover: theme.palette.grey[900] };
    case themeMode === ThemeEnum.DARK && !disabled:
      return { simple: theme.palette.primary.dark, hover: theme.palette.primary.light };
    case themeMode === ThemeEnum.LIGHT && disabled:
      return { simple: theme.palette.grey[600], hover: theme.palette.grey[600] };
    case themeMode === ThemeEnum.LIGHT && !disabled:
      return { simple: theme.palette.primary.main, hover: theme.palette.primary.light };
    default:
      return { simple: theme.palette.grey[600], hover: theme.palette.grey[600] };
  }
};

export const getPlayerResultBackgroundColor = (
  theme: Theme,
  isPlayerLost: boolean,
  isPlayerWin: boolean,
) => {
  switch (true) {
    case isPlayerWin:
      return theme.palette.mode === ThemeEnum.DARK
        ? theme.palette.primary.dark
        : theme.palette.primary.light;
    case isPlayerLost:
      return theme.palette.mode === ThemeEnum.DARK
        ? theme.palette.error.dark
        : theme.palette.error.main;
    default:
      return 'transparent';
  }
};

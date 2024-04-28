/* eslint-disable sonarjs/no-duplicate-string */
import { styled } from '@mui/material';
import { ThemeEnum } from 'utils/enum';
export const StyledGameResultsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
}));

interface StyledResultsScoreProps {
  isPlayerWin: boolean;
  isPlayerLost: boolean;
}
export const StyledResultsScore = styled('h3')<StyledResultsScoreProps>(
  ({ isPlayerWin, isPlayerLost, theme }) => ({
    color: isPlayerWin ? theme.palette.common.white : theme.palette.common.black,
    backgroundColor: isPlayerWin
      ? theme.palette.mode === ThemeEnum.DARK
        ? theme.palette.primary.dark
        : theme.palette.primary.light
      : isPlayerLost
      ? theme.palette.mode === ThemeEnum.DARK
        ? theme.palette.error.dark
        : theme.palette.error.main
      : theme.palette.mode === ThemeEnum.DARK
      ? theme.palette.grey[500]
      : theme.palette.common.white,
    padding: 8,
    width: '155px',
    textAlign: 'center',
  }),
);

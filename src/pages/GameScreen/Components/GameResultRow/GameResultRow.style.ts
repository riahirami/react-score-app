/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, Typography, styled } from '@mui/material';
import { getButtonBackgroundColor, getPlayerResultBackgroundColor } from 'utils/helpers/helpers';
export const StyledGameResultsRowContainer = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
}));

export const StyledGameResultContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: getButtonBackgroundColor(false, theme).simple,
  position: 'fixed',
  width: '100%',
  bottom: 0,
  height: 100,
}));

interface StyledResultsScoreProps {
  isPlayerWin: boolean;
  isPlayerLost: boolean;
}
export const StyledResultsScore = styled(Typography)<StyledResultsScoreProps>(
  ({ isPlayerWin, isPlayerLost, theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: getPlayerResultBackgroundColor(theme, isPlayerLost, isPlayerWin),
  }),
);

/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, Typography, styled } from '@mui/material';
import { DirectionType } from 'types/interfaces/global';
import { getButtonBackgroundColor, getPlayerResultBackgroundColor } from 'utils/helpers/helpers';
export const StyledGameResultsRowContainer = styled(Grid)<StyledGameResultContainerProps>(
  ({ customDirection }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    direction: customDirection,
  }),
);

interface StyledGameResultContainerProps {
  customDirection: DirectionType;
}
export const StyledGameResultContainer = styled(Grid)<StyledGameResultContainerProps>(
  ({ theme, customDirection }) => ({
    backgroundColor: getButtonBackgroundColor(false, theme).simple,
    position: 'fixed',
    width: '100%',
    bottom: 0,
    height: 100,
    direction: customDirection,
  }),
);

interface StyledResultsScoreProps {
  isPlayerWin: boolean;
  isPlayerLost: boolean;
}
export const StyledResultsScore = styled(Typography)<StyledResultsScoreProps>(
  ({ isPlayerWin, isPlayerLost, theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: getPlayerResultBackgroundColor(theme, isPlayerLost, isPlayerWin),
    fontSize: 20,
    fontWeight: 'bold',
  }),
);

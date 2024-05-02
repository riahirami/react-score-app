/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, styled } from '@mui/material';
import { DirectionType } from 'types/interfaces/global';
import { colors } from 'utils/colors';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';
import { ThemeEnum } from 'utils/enum';

export const StyledInlineTypography = styled(Grid)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: 12,
  paddingLeft: 24,
  paddingRight: 24,
  direction: 'rtl',
}));

interface StyledGameDetailsContainerProps {
  customDirection: DirectionType;
}
export const StyledGameDetailsContainer = styled(Grid)<StyledGameDetailsContainerProps>(
  ({ theme, customDirection }) => ({
    justifyContent: 'center',
    border: '2px solid',
    borderColor: `${theme.palette.primary.main}`,
    backgroundColor:
      theme.palette.mode === ThemeEnum.DARK ? colors.DARK_BLUE : theme.palette.info.dark,
    borderRadius: '12px',
    margin: 15,
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    color:
      theme.palette.mode === ThemeEnum.DARK ? theme.palette.grey[400] : theme.palette.common.white,
    minWidth: GAME_SCREEN_MIN_WIDTH,
    width: '60%',
    direction: customDirection,
  }),
);

export const StyledTeamModeImageContainer = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  gap: 12,
  direction: 'rtl',
}));

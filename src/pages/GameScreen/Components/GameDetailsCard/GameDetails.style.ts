/* eslint-disable sonarjs/no-duplicate-string */
import { styled } from '@mui/material';
import { colors } from 'utils/colors';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';
import { ThemeEnum } from 'utils/enum';

export const StyledInlineTypography = styled('div')(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: 12,
  paddingLeft: 24,
  paddingRight: 24,
}));

export const StyledGameDetailsContainer = styled('div')(({ theme }) => ({
  justifyContent: 'center',
  border: '2px solid',
  borderColor: `${theme.palette.primary.main}`,
  backgroundColor:
    theme.palette.mode === ThemeEnum.DARK ? colors.darkBlue : theme.palette.info.dark,
  borderRadius: '12px',
  margin: 15,
  textAlign: 'center',
  marginRight: 'auto',
  marginLeft: 'auto',
  color:
    theme.palette.mode === ThemeEnum.DARK ? theme.palette.grey[400] : theme.palette.common.white,
  minWidth: GAME_SCREEN_MIN_WIDTH,
  width: '60%',
}));

export const StyledTeamModeImageContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  gap: 12,
}));

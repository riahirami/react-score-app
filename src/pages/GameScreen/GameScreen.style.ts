/* eslint-disable sonarjs/no-duplicate-string */
import { TextField, Typography, styled } from '@mui/material';
import { colors } from 'utils/colors';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';
import { ThemeEnum } from 'utils/enum';

export const StyledGameScreenContainer = styled('div')(({ theme }) => ({
  // display: 'grid',
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === ThemeEnum.LIGHT
      ? theme.palette.background.default
      : theme.palette.grey[400],
  minHeight: '100vh',
  minWidth: GAME_SCREEN_MIN_WIDTH,
  marginRight: 'auto',
  marginLeft: 'auto',
}));

export const StyledGameResultsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16,
}));

export const StyledPlayerNameContainer = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: 16,
  marginRight: '60px',
  marginLeft: '60px',
}));

export const StyledRoundsScoreContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: 16,
  marginRight: '60px',
  marginLeft: '60px',
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

export const StyledInlineTypography = styled('div')(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  padding: 12,
  paddingLeft: 24,
  paddingRight: 24,
}));

export const StyledTextFieldContainer = styled('div')(() => ({
  width: '155px',
  display: 'inline-grid',
  justifyItems: 'center',
}));

export const StyledTextField = styled(TextField)(({ theme, disabled }) => ({
  width: '55px',
  textAlignLast: 'center',
  border: `${!disabled} && 1px solid ${theme.palette.grey[400]}`,
  borderRadius: 8,
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
  width: '70%',
}));
export const StyledGameActionsContainer = styled('div')(() => ({
  display: 'grid',
  justifyContent: 'center',
  textAlign: 'center',
  margin: 10,
}));
export const StyledDinerImageContainer = styled('div')(() => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
}));

export const StyledTeamModeImageContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'end',
  gap: 12,
}));

export const StyledCustomButton = styled('button')(({ theme, disabled }) => ({
  backgroundColor: disabled
    ? theme.palette.grey[600]
    : theme.palette.mode === ThemeEnum.DARK
    ? theme.palette.primary.dark
    : theme.palette.primary.light,
  border:
    disabled && theme.palette.mode === ThemeEnum.DARK
      ? `0.5px solid ${theme.palette.grey[600]}`
      : 'none',
  padding: 8,
  borderRadius: 8,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: disabled
      ? 'none'
      : theme.palette.mode === ThemeEnum.DARK
      ? theme.palette.primary.light
      : theme.palette.grey[400],
    cursor: disabled ? 'default' : 'pointer',
  },
}));

export const StyledThemeSwitchContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

export const StyledGameContainer = styled('div')(({ theme }) => ({
  minWidth: GAME_SCREEN_MIN_WIDTH,
}));

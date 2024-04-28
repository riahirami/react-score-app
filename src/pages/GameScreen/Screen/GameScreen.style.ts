/* eslint-disable sonarjs/no-duplicate-string */
import { TextField, styled } from '@mui/material';
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

export const StyledRoundsScoreContainer = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: 16,
  marginRight: '60px',
  marginLeft: '60px',
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

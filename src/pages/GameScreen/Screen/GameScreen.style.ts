/* eslint-disable sonarjs/no-duplicate-string */
import { styled } from '@mui/material';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';
import { ThemeEnum } from 'utils/enum';

export const StyledGameContainer = styled('div')(() => ({
  minWidth: GAME_SCREEN_MIN_WIDTH,
}));

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

/* eslint-disable sonarjs/no-duplicate-string */
import { Button, DialogActions, Grid, styled } from '@mui/material';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';
import { ThemeEnum } from 'utils/enum';

export const StyledGameContainer = styled(Grid)(() => ({
  minWidth: GAME_SCREEN_MIN_WIDTH,
}));

export const StyledGameScreenContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
  backgroundColor:
    theme.palette.mode === ThemeEnum.LIGHT
      ? theme.palette.background.default
      : theme.palette.grey[400],
  minHeight: '100vh',
  minWidth: GAME_SCREEN_MIN_WIDTH,
  marginRight: 'auto',
  marginLeft: 'auto',
  marginBottom: 100,
}));

export const StyledCustomButton = styled(Button)(({ theme, disabled }) => ({
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

export const StyledGameScreenHeader = styled(Grid)(() => ({
  padding: 10,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}));

export const StyledExitModalButtonContainer = styled(DialogActions)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
}));

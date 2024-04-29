import { Grid, TextField, styled } from '@mui/material';
import { ThemeEnum } from 'utils/enum';

export const StyledRoundsScoreContainer = styled(Grid)(() => ({
  display: 'flex',
}));

export const StyledGridContainer = styled(Grid)(() => ({
  alignItems: 'center',
}));
export const StyledTextFieldContainer = styled('div')(() => ({}));
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

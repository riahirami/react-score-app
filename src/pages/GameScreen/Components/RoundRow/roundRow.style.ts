import { Grid, TextField, styled } from '@mui/material';
import { ThemeEnum } from 'utils/enum';
import { getButtonBackgroundColor, getPendingRoundColor } from 'utils/helpers/helpers';
interface StyledRoundsScoreContainerProps {
  pendingRound: boolean;
}
export const StyledRoundsScoreContainer = styled(Grid)<StyledRoundsScoreContainerProps>(
  ({ theme, pendingRound }) => ({
    display: 'flex',
    backgroundColor: getPendingRoundColor(pendingRound, theme),
    opacity: !pendingRound ? 0.5 : 1,
  }),
);

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
  margin: 4,
  backgroundColor: getButtonBackgroundColor(disabled, theme).simple,
  border:
    disabled && theme.palette.mode === ThemeEnum.DARK
      ? `0.5px solid ${theme.palette.grey[600]}`
      : 'none',
  padding: 8,
  borderRadius: 8,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: getButtonBackgroundColor(disabled, theme).hover,
    cursor: disabled ? 'default' : 'pointer',
  },
}));

import { Grid, TextField, styled } from '@mui/material';
import { DirectionType } from 'types/interfaces/global';
import { ThemeEnum } from 'utils/enum';
import { getButtonBackgroundColor, getPendingRoundColor } from 'utils/helpers/helpers';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

interface StyledRoundsScoreContainerProps {
  pendingRound: boolean;
  customDirection: DirectionType;
}
export const StyledRoundsScoreContainer = styled(Grid)<StyledRoundsScoreContainerProps>(
  ({ theme, pendingRound, customDirection }) => ({
    display: 'flex',
    backgroundColor: getPendingRoundColor(pendingRound, theme),
    opacity: !pendingRound ? 0.5 : 1,
    direction: customDirection,
  }),
);

export const StyledGridContainer = styled(Grid)(() => ({
  // eslint-disable-next-line sonarjs/no-duplicate-string
  marginTop: '20px',
  alignItems: 'flex-start',
}));
export const StyledTextFieldContainer = styled('div')(() => ({
  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
}));
export const StyledTextField = styled(TextField)(({ theme, disabled }) => ({
  width: '55px',
  textAlignLast: 'center',
  border: `${!disabled} && 1px solid ${theme.palette.grey[400]}`,
  borderRadius: 8,
}));

export const StyledErrorContainer = styled(Grid)(() => ({
  width: '55px',
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

interface StyleIconProps {
  iconColor: string;
  iconWidth?: number;
}
export const StyledDoneIcon = styled(DoneOutlineIcon)<StyleIconProps>(
  ({ iconColor, iconWidth }) => ({
    color: iconColor,
    width: iconWidth,
  }),
);
export const StyledDeleteIcon = styled(DeleteForeverOutlinedIcon)<StyleIconProps>(
  ({ iconColor }) => ({
    color: iconColor,
  }),
);

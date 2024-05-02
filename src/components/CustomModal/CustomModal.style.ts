import { Dialog, DialogActions, styled } from '@mui/material';
import { DirectionType } from 'types/interfaces/global';

interface CustomModalStyleProps {
  customDirection: DirectionType;
}
export const CustomModalStyle = styled(Dialog)<CustomModalStyleProps>(({ customDirection }) => ({
  direction: customDirection,
}));

export const StyledExitModalButtonContainer = styled(DialogActions)(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 8,
}));

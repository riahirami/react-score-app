import { styled } from '@mui/material';
import { colors } from 'utils/colors';

export const StyledOverlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  opacity: 0.6,
  elevation: 2,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: colors.BLACK,
  zIndex: 999,
}));

import { Grid, styled } from '@mui/material';
import { colors } from 'utils/colors';

export const StyledBadgeContainer = styled(Grid)(() => ({
  backgroundColor: colors.RED,
  rotate: '41deg',
  padding: 5,
  color: colors.WHITE,
  position: 'fixed',
  top: 25,
  left: '90%',
  width: 200,
  textAlign: 'center',
}));

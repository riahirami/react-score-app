import { Grid, styled } from '@mui/material';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';
import { ThemeEnum } from 'utils/enum';

export const StyledContainer = styled(Grid)(() => ({
  display: 'grid',
  justifyContent: 'center',
  padding: 10,
}));
export const StyledGameActionsContainer = styled(Grid)(({ theme }) => ({
  display: 'grid',
  justifyContent: 'center',
  textAlign: 'center',
  margin: 10,
  backgroundColor:
    theme.palette.mode === ThemeEnum.DARK ? theme.palette.primary.dark : theme.palette.grey[300],
  marginTop: 15,
  marginBottom: 15,
  marginRight: 'auto',
  marginLeft: 'auto',
  color:
    theme.palette.mode === ThemeEnum.DARK ? theme.palette.grey[400] : theme.palette.common.white,
  minWidth: GAME_SCREEN_MIN_WIDTH,
  width: '60%',
  borderRadius: 10,
  padding: 10,
}));

export const StyledDinerImageContainer = styled(Grid)(() => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: 9999,
}));

export const StyledImage = styled('img')`
  @media (max-width: 1024px) {
    width: 230;
    height: 350;
  }
  @media (max-width: 768px) {
    width: 200;
    height: 240;
  }
  @media (max-width: 576px) {
    display: none;
  }
  @media (max-width: 320px) {
    display: none;
  }
`;

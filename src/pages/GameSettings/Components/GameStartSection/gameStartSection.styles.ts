import { Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ThemeEnum } from 'utils/enum';

export const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  gap: 20,
}));

export const StyledButtonContainer = styled(Grid)(({ theme }) => ({
  justifyContent: 'center',
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  margin: 3,
  backgroundColor:
    theme.palette.mode === ThemeEnum.DARK ? theme.palette.primary.dark : theme.palette.primary.main,
  gap: 8,
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

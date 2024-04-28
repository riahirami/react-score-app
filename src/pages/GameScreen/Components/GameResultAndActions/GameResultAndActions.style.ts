import { styled } from '@mui/material';

export const StyledGameActionsContainer = styled('div')(() => ({
  display: 'grid',
  justifyContent: 'center',
  textAlign: 'center',
  margin: 10,
}));

export const StyledDinerImageContainer = styled('div')(() => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
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

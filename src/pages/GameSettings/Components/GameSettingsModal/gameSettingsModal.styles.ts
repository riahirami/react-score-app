/* eslint-disable sonarjs/no-duplicate-string */
import { styled } from '@mui/material/styles';

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
}));

export const StyledFormInnerContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',

  '@media (max-width: 576px)': {
    flexDirection: 'column',
  },
  '@media (max-width: 320px)': {
    flexDirection: 'column',
  },
}));

export const StyledFormContainer = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 16,

  '@media (max-width: 576px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
  },
  '@media (max-width: 320px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
  },
}));

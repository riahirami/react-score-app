import { Button, styled } from '@mui/material';

export const StyledShareButton = styled(Button)(({ theme }) => ({
  borderRadius: 66,
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark,
  },
}));

import { styled } from '@mui/material';
import { colors } from 'utils/colors';
import { images } from 'utils/images';

export const StyledLoaderContainer = styled('div')(({ theme }) => ({
  '.loader': {
    border: `8px solid ${colors.DARK_BLUE}`,
    borderTop: `8px solid ${colors.LIGHT_BLUE}`,
    borderRadius: '100%',
    width: '80px',
    height: '80px',
    animation: 'spin 1s linear infinite',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-20px',
    marginTop: '-20px',
    zIndex: '1000',
  },
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
}));

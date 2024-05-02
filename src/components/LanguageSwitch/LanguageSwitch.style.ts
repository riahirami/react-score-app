import { Switch, styled } from '@mui/material';
import { ThemeEnum } from 'utils/enum';
import { images } from 'utils/images';

export const StyledLanguageSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        width: '32px',
        height: '32px',
        backgroundSize: '32px 32px',
        backgroundImage: `url(${images.TUNISIA})`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? '#e9ebec' : '#cee1f3',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor:
      theme.palette.mode === ThemeEnum.DARK ? '#8796A5' : theme.palette.primary.light,
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '32px',
      height: '32px',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '50px 50px',
      backgroundImage: `url(${images.FRANCE})`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === ThemeEnum.DARK ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

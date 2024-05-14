import { styled } from '@mui/material/styles';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';
import { ThemeEnum } from 'utils/enum';

export const StyledContainer = styled('div')(({ theme }) => ({
  minWidth: GAME_SCREEN_MIN_WIDTH,

  backgroundColor:
    theme.palette.mode === ThemeEnum.DARK ? theme.palette.grey[400] : theme.palette.common.white,
}));

import { styled } from '@mui/material/styles';
import { GAME_SCREEN_MIN_WIDTH } from 'utils/constants';

export const StyledContainer = styled('div')(({ theme }) => ({ minWidth: GAME_SCREEN_MIN_WIDTH }));

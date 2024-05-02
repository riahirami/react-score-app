/* eslint-disable sonarjs/no-duplicate-string */
import { Typography, styled } from '@mui/material';
import { DirectionType } from 'types/interfaces/global';

interface StyledPlayerNameContainerProps {
  customDirection: DirectionType;
}
export const StyledPlayerNameContainer = styled(Typography)<StyledPlayerNameContainerProps>(
  ({ customDirection }) => ({
    direction: customDirection,
  }),
);

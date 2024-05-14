import { Grid, Typography } from '@mui/material';
import React from 'react';
import { colors } from 'utils/colors';
interface GameCodeProps {
  description: string;
  gameCode: string;
}
const GameCode = ({ description, gameCode }: GameCodeProps) => {
  return (
    <Grid>
      <Typography variant="h6" color={colors.GREY}>
        {description}
      </Typography>
      <Typography variant="h4" color={colors.BLACK} textAlign={'center'}>
        {gameCode}
      </Typography>
    </Grid>
  );
};

export default GameCode;

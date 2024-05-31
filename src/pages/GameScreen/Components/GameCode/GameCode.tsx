import { Grid, Stack, Typography } from '@mui/material';
import { env } from 'config/env/dev';
import React from 'react';
import { colors } from 'utils/colors';
interface GameCodeProps {
  description: string;
  gameCode: string | unknown;
}
const GameCode = ({ description, gameCode }: GameCodeProps) => {
  return (
    <Grid>
      <Typography variant="h6" color={colors.BLACK}>
        {description}
      </Typography>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h4" color={colors.BLACK} textAlign={'center'}>
          {' « '} {gameCode as string} {' » '}
        </Typography>
        <Typography>
          <a href={env.url + '/join-game/' + gameCode}>{env.url + '/join-game/' + gameCode}</a>
        </Typography>
      </Stack>
    </Grid>
  );
};

export default GameCode;

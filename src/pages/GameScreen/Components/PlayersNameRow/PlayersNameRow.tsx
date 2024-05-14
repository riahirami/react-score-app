/* eslint-disable sonarjs/no-duplicate-string */
import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Game, GameFbResponse } from 'types/interfaces/game';
import { StyledPlayerNameContainer } from './PlayersNameRow.style';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import useDesignDirection from 'hooks/useDesignDirection';

interface PlayersNameRowProps {
  game: Game | GameFbResponse;
}
const PlayersNameRow = ({ game }: PlayersNameRowProps) => {
  const { direction } = useDesignDirection();
  return (
    <StyledPlayerNameContainer customDirection={direction}>
      <Grid container>
        <CustomColumnGrid />
        {game.players.map((player, index) => (
          <CustomColumnGrid key={index} isMiddleGrid game={game}>
            <Typography variant="h6" textAlign={'center'}>
              {player?.name ?? player}
            </Typography>
          </CustomColumnGrid>
        ))}
        <CustomColumnGrid />
      </Grid>
      <Divider />
    </StyledPlayerNameContainer>
  );
};

export default PlayersNameRow;

/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Game } from 'types/interfaces/game';
import { StyledPlayerNameContainer } from './PlayersNameRow.style';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';

interface PlayersNameRowProps {
  game: Game;
}
const PlayersNameRow = ({ game }: PlayersNameRowProps) => {
  return (
    <StyledPlayerNameContainer>
      <Grid container>
        <CustomColumnGrid />
        {game.players.map((player, index) => (
          <CustomColumnGrid key={index} isMiddleGrid>
            <Typography variant="h6" textAlign={'center'}>
              {player.name}
            </Typography>
          </CustomColumnGrid>
        ))}
        <CustomColumnGrid />
      </Grid>
    </StyledPlayerNameContainer>
  );
};

export default PlayersNameRow;

/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Game } from 'types/interfaces/game';
import { StyledPlayerNameContainer } from './PlayersNameRow.style';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import useDesignDirection from 'hooks/useDesignDirection';

interface PlayersNameRowProps {
  game: Game;
}
const PlayersNameRow = ({ game }: PlayersNameRowProps) => {
  const { direction } = useDesignDirection();
  return (
    <StyledPlayerNameContainer customDirection={direction}>
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

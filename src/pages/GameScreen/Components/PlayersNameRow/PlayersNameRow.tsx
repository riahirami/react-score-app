import { Typography } from '@mui/material';
import React from 'react';
import { Game } from 'types/interfaces/game';
import { StyledPlayerNameContainer } from './PlayersNameRow.style';

interface PlayersNameRowProps {
  game: Game;
}
const PlayersNameRow = ({ game }: PlayersNameRowProps) => {
  return (
    <StyledPlayerNameContainer>
      {game.players.map((player, index) => (
        <Typography variant="h6" key={index}>
          {player.name}
        </Typography>
      ))}
    </StyledPlayerNameContainer>
  );
};

export default PlayersNameRow;

import { Grid, Typography } from '@mui/material';
import React from 'react';
import { GameFbResponse } from 'types/interfaces/game';

interface GameCardProps {
  game: GameFbResponse;
  handleResumeGame: (gameId: string) => void;
}
const GameCard = ({ game, handleResumeGame }: GameCardProps) => {
  return (
    <Grid key={game.gameId} style={{ border: '2px solid black', margin: 5, padding: 10 }}>
      <Typography>id :{game.gameId}</Typography>
      <Typography>Jeu : {game.gameType}</Typography>
      <Typography>Nombre des joueurs : {game.playersNumber}</Typography>
      <Typography>Code : {game.gameId}</Typography>
      <Typography>Status : {game.isGameOver ? 'terminer' : 'en cours'}</Typography>
      <Typography>Score : </Typography>
      {game.players.map((player) => {
        return (
          <Grid key={player.playerIndex}>
            <Typography>
              {player.name} : {player.score}
            </Typography>
          </Grid>
        );
      })}
      <button onClick={() => handleResumeGame(game.gameId)}>Rejoindre</button>
    </Grid>
  );
};

export default GameCard;

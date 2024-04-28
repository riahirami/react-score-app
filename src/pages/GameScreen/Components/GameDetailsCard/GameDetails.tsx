/* eslint-disable sonarjs/no-duplicate-string */
import React from 'react';
import {
  StyledGameDetailsContainer,
  StyledInlineTypography,
  StyledTeamModeImageContainer,
} from './GameDetails.style';
import { Typography } from '@mui/material';
import { Game } from 'types/interfaces/game';
import { images } from 'utils/images';

interface GameDetailsProps {
  game: Game;
}
const GameDetails = ({ game }: GameDetailsProps) => {
  return (
    <StyledGameDetailsContainer>
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'}>
          Partie : {game.gameType} - Nombre des joueurs : {game.players.length}
        </Typography>
      </StyledInlineTypography>
      {game.team && (
        <StyledTeamModeImageContainer>
          <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
            Mode équipe activé
          </Typography>
          <img src={images.TEAMWORK} alt="team" width="50" />
        </StyledTeamModeImageContainer>
      )}
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
          Score à atteindre : {''}
          {game.finalScore}
        </Typography>
      </StyledInlineTypography>
    </StyledGameDetailsContainer>
  );
};

export default GameDetails;

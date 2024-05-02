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
import { useTranslation } from 'react-i18next';
import useDesignDirection from 'hooks/useDesignDirection';

interface GameDetailsProps {
  game: Game;
}
const GameDetails = ({ game }: GameDetailsProps) => {
  const { t } = useTranslation();
  const { direction } = useDesignDirection();
  const gameType = game.gameType;
  return (
    <StyledGameDetailsContainer customDirection={direction}>
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'}>
          {t('Game')} : {t(`GameTypeEnum.${gameType}`)} - {t('Player_number')} :{' '}
          {game.players.length}
        </Typography>
      </StyledInlineTypography>
      {game.team && (
        <StyledTeamModeImageContainer>
          <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
            {t('Game_mode')}
          </Typography>
          <img src={images.TEAMWORK} alt="team" width="50" />
        </StyledTeamModeImageContainer>
      )}
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
          {t('Game_score')} : {''}
          {game.finalScore}
        </Typography>
      </StyledInlineTypography>
    </StyledGameDetailsContainer>
  );
};

export default GameDetails;

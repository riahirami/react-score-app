/* eslint-disable sonarjs/no-duplicate-string */
import { Typography } from '@mui/material';
import useDesignDirection from 'hooks/useDesignDirection';
import { Game, GameFbResponse } from 'types/interfaces/game';
import { images } from 'utils/images';
import {
  StyledGameDetailsContainer,
  StyledInlineTypography,
  StyledTeamModeImageContainer,
} from './GameDetails.style';
import { translate } from 'locales/i18n';

interface GameDetailsProps {
  game: Game | GameFbResponse | undefined;
}
const GameDetails = ({ game }: GameDetailsProps) => {
  const { direction } = useDesignDirection();
  const gameType = game?.gameType;
  return (
    <StyledGameDetailsContainer customDirection={direction}>
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'}>
          {translate('Game')} : {translate(`GameTypeEnum.${gameType}`)} -{' '}
          {translate('Player_number')} : {game?.players.length}
        </Typography>
      </StyledInlineTypography>
      {game?.team && (
        <StyledTeamModeImageContainer>
          <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
            {translate('Game_mode')}
          </Typography>
          <img src={images.TEAMWORK} alt="team" width="50" />
        </StyledTeamModeImageContainer>
      )}
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
          {translate('Game_score')} : {''}
          {game?.finalScore}
        </Typography>
      </StyledInlineTypography>
    </StyledGameDetailsContainer>
  );
};

export default GameDetails;

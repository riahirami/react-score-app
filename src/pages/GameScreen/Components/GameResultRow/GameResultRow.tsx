/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, Typography } from '@mui/material';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import useDesignDirection from 'hooks/useDesignDirection';
import { Game, GameFbResponse, Player } from 'types/interfaces/game';
import { colors } from 'utils/colors';
import {
  StyledGameResultContainer,
  StyledGameResultsRowContainer,
  StyledResultsScore,
} from './GameResultRow.style';
import { translate } from 'locales/i18n';

interface GameResultRowProps {
  game: Game | GameFbResponse;
  ifPlayerOnWinnersPlayers: (player: Player) => boolean;
  ifPlayerOnLostPlayers: (player: Player) => boolean;
}
const GameResultRow = ({
  game,
  ifPlayerOnWinnersPlayers,
  ifPlayerOnLostPlayers,
}: GameResultRowProps) => {
  const { direction } = useDesignDirection();

  return (
    <StyledGameResultContainer customDirection={direction}>
      <Typography variant="h6" color={colors.WHITE} marginLeft={2}>
        {translate('Score')} :{' '}
      </Typography>
      <StyledGameResultsRowContainer customDirection={direction}>
        <Grid container>
          <CustomColumnGrid />
          {game.players.map((player, index) => (
            <CustomColumnGrid key={index} isMiddleGrid game={game}>
              <Typography>{player.name}</Typography>
              <StyledResultsScore
                key={index}
                isPlayerWin={ifPlayerOnWinnersPlayers(player)}
                isPlayerLost={ifPlayerOnLostPlayers(player)}
              >
                {player.score}
              </StyledResultsScore>
            </CustomColumnGrid>
          ))}
          <CustomColumnGrid />
        </Grid>
      </StyledGameResultsRowContainer>
    </StyledGameResultContainer>
  );
};

export default GameResultRow;

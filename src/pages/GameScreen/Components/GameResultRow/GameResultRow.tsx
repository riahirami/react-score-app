/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, Typography } from '@mui/material';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import { Game, Player } from 'types/interfaces/game';
import { colors } from 'utils/colors';
import {
  StyledGameResultContainer,
  StyledGameResultsRowContainer,
  StyledResultsScore,
} from './GameResultRow.style';

interface GameResultRowProps {
  game: Game;
  ifPlayerOnWinnersPlayers: (player: Player) => boolean;
  ifPlayerOnLostPlayers: (player: Player) => boolean;
}
const GameResultRow = ({
  game,
  ifPlayerOnWinnersPlayers,
  ifPlayerOnLostPlayers,
}: GameResultRowProps) => {
  return (
    <StyledGameResultContainer>
      <Typography variant="h6" color={colors.WHITE} marginLeft={2}>
        Score :{' '}
      </Typography>
      <StyledGameResultsRowContainer>
        <Grid container>
          <CustomColumnGrid />
          {game.players.map((player, index) => (
            <CustomColumnGrid key={index} isMiddleGrid>
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

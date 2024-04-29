/* eslint-disable sonarjs/no-duplicate-string */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { StyledGameResultsContainer, StyledResultsScore } from './GameResultRow.style';
import { colors } from 'utils/colors';
import { Game, Player } from 'types/interfaces/game';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';

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
    <Grid>
      <Typography variant="h6" color={colors.darkBlue} marginLeft={2}>
        Score :{' '}
      </Typography>
      <StyledGameResultsContainer>
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
      </StyledGameResultsContainer>
    </Grid>
  );
};

export default GameResultRow;

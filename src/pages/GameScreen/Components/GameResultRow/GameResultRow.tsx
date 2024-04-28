import { Grid, Typography } from '@mui/material';
import React from 'react';
import { StyledGameResultsContainer, StyledResultsScore } from './GameResultRow.style';
import { colors } from 'utils/colors';
import { Game, Player } from 'types/interfaces/game';

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
      <Grid>
        <StyledGameResultsContainer>
          {game.players.map((player, index) => (
            <>
              <StyledResultsScore
                key={index}
                isPlayerWin={ifPlayerOnWinnersPlayers(player)}
                isPlayerLost={ifPlayerOnLostPlayers(player)}
              >
                {player.score}
              </StyledResultsScore>
              {index + 1 < game.players.length && (
                <Typography variant="h4" textAlign={'center'}>
                  {' '}
                  -{' '}
                </Typography>
              )}
            </>
          ))}
        </StyledGameResultsContainer>
      </Grid>
    </Grid>
  );
};

export default GameResultRow;

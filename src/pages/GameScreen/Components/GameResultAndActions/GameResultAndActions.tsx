import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { colors } from 'utils/colors';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  StyledDinerImageContainer,
  StyledGameActionsContainer,
  StyledImage,
} from './GameResultAndActions.style';
import { images } from 'utils/images';
import { Game, Player } from 'types/interfaces/game';

interface GameResultAndActionsProps {
  handleAlertOpen: () => void;
  replayGameAction: () => void;
  checkIfGameIsOver: () => boolean;
  checkIfPlayerWin: (player: Player) => boolean;
  game: Game;
}
const GameResultAndActions = ({
  handleAlertOpen,
  replayGameAction,
  checkIfGameIsOver,
  checkIfPlayerWin,
  game,
}: GameResultAndActionsProps) => {
  return (
    <StyledGameActionsContainer>
      {!checkIfGameIsOver() ? (
        <Button
          onClick={handleAlertOpen}
          variant="contained"
          style={{
            backgroundColor: colors.red,
          }}
          sx={{ textTransform: 'none' }}
        >
          Quitter le jeu ?
        </Button>
      ) : (
        <Grid>
          <Typography style={{ color: colors.red }} variant="h4">
            Terba7 a Youssef
          </Typography>
          <StyledDinerImageContainer>
            <StyledImage src={images.EDINERI} width={250} height={323} />
          </StyledDinerImageContainer>
          <Grid gap={22} pt={2} pb={1}>
            {game.players?.map(
              (player, index) =>
                checkIfPlayerWin(player) && (
                  <Typography key={index} variant="h5" style={{ color: colors.lightBlue }}>
                    {player.name} gagne avec un score: {player.score}
                  </Typography>
                ),
            )}
            <Button onClick={replayGameAction} variant="contained">
              <ReplayIcon />
            </Button>
          </Grid>
        </Grid>
      )}
    </StyledGameActionsContainer>
  );
};

export default GameResultAndActions;

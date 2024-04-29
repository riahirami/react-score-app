import ReplayIcon from '@mui/icons-material/Replay';
import { Button, Grid, Typography } from '@mui/material';
import { Game, Player } from 'types/interfaces/game';
import { colors } from 'utils/colors';
import { images } from 'utils/images';
import {
  StyledContainer,
  StyledDinerImageContainer,
  StyledGameActionsContainer,
  StyledImage,
} from './GameResultAndActions.style';

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
    <StyledContainer>
      {!checkIfGameIsOver() ? (
        <Button
          onClick={handleAlertOpen}
          variant="contained"
          style={{
            backgroundColor: colors.RED,
          }}
          sx={{ textTransform: 'none' }}
        >
          Quitter le jeu ?
        </Button>
      ) : (
        <StyledGameActionsContainer>
          <Typography style={{ color: colors.RED }} variant="h4">
            Terba7 a Youssef
          </Typography>
          <StyledDinerImageContainer>
            <StyledImage src={images.EDINERI} width={250} height={323} />
          </StyledDinerImageContainer>
          <Grid gap={22} pt={2} pb={1}>
            {game.players?.map(
              (player, index) =>
                checkIfPlayerWin(player) && (
                  <Typography key={index} variant="h5" style={{ color: colors.LIGHT_BLUE }}>
                    {player.name} gagne avec un score: {player.score}
                  </Typography>
                ),
            )}
            <Button onClick={replayGameAction} variant="contained">
              <ReplayIcon />
            </Button>
          </Grid>
        </StyledGameActionsContainer>
      )}
    </StyledContainer>
  );
};

export default GameResultAndActions;

import ReplayIcon from '@mui/icons-material/Replay';
import { Button, Grid, Typography } from '@mui/material';
import { Game, Player } from 'types/interfaces/game';
import { colors } from 'utils/colors';
import { images } from 'utils/images';
import ExitButton from '../ExitButton/ExitButton';
import {
  StyledContainer,
  StyledDinerImageContainer,
  StyledGameActionsContainer,
  StyledImage,
} from './GameResultAndActions.style';
import { translate } from 'locales/i18n';
interface GameResultAndActionsProps {
  replayGameAction: () => void;
  checkIfGameIsOver: () => boolean;
  checkIfPlayerWin: (player: Player) => boolean;
  game: Game | undefined;
}
const GameResultAndActions = ({
  replayGameAction,
  checkIfGameIsOver,
  checkIfPlayerWin,
  game,
}: GameResultAndActionsProps) => {
  return (
    <StyledContainer>
      <Grid container gap={2} justifyContent={'center'}>
        <ExitButton />
        <Button
          onClick={replayGameAction}
          style={{
            backgroundColor: colors.DARK_BLUE,
          }}
          variant="contained"
          sx={{ textTransform: 'none' }}
        >
          <ReplayIcon /> {translate('Game_Actions.Replay')}
        </Button>
      </Grid>
      {checkIfGameIsOver() && (
        <StyledGameActionsContainer>
          <Typography style={{ color: colors.RED }} variant="h4">
            {translate('Winner_message')}
          </Typography>
          <StyledDinerImageContainer>
            <StyledImage src={images.EDINERI} width={250} height={323} />
          </StyledDinerImageContainer>
          <Grid gap={22} pt={2} pb={1}>
            {game?.players?.map(
              (player, index) =>
                checkIfPlayerWin(player) && (
                  <Typography
                    key={`${player.playerIndex}.${index}`}
                    variant="h5"
                    style={{ color: colors.LIGHT_BLUE, direction: 'rtl' }}
                  >
                    {player.name} {translate('Winner_is')} {player.score}
                  </Typography>
                ),
            )}
          </Grid>
        </StyledGameActionsContainer>
      )}
    </StyledContainer>
  );
};

export default GameResultAndActions;

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
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { use } from 'i18next';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <Grid container gap={2} justifyContent={'center'}>
        <Button
          onClick={handleAlertOpen}
          variant="contained"
          style={{
            backgroundColor: colors.RED,
          }}
          sx={{ textTransform: 'none' }}
        >
          <LogoutOutlinedIcon /> {t('Game_Actions.Quit')}
        </Button>
        <Button
          onClick={replayGameAction}
          style={{
            backgroundColor: colors.DARK_BLUE,
          }}
          variant="contained"
          sx={{ textTransform: 'none' }}
        >
          <ReplayIcon /> {t('Game_Actions.Replay')}
        </Button>
      </Grid>
      {checkIfGameIsOver() && (
        <StyledGameActionsContainer>
          <Typography style={{ color: colors.RED }} variant="h4">
            {t('Winner_message')}
          </Typography>
          <StyledDinerImageContainer>
            <StyledImage src={images.EDINERI} width={250} height={323} />
          </StyledDinerImageContainer>
          <Grid gap={22} pt={2} pb={1}>
            {game.players?.map(
              (player, index) =>
                checkIfPlayerWin(player) && (
                  <Typography
                    key={`${player.playerIndex}.${index}`}
                    variant="h5"
                    style={{ color: colors.LIGHT_BLUE, direction: 'rtl' }}
                  >
                    {player.name} {t('Winner_is')} {player.score}
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

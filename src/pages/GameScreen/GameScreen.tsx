/* eslint-disable sonarjs/no-duplicate-string */
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import { Button, Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { StyledImage } from 'pages/GameSettings/Components/GameStartSection/gameStartSection.styles';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useAppDispatch } from 'redux/hooks';
import { colors } from 'utils/colors';
import { images } from 'utils/images';
import useModalAlert from '../../hooks/useModalAlert';
import {
  StyledGameActionsContainer,
  StyledGameDetailsContainer,
  StyledGameResultsContainer,
  StyledInlineTypography,
  StyledPlayerNameContainer,
  StyledResultsScore,
  StyledRoundsScoreContainer,
  StyledTextField,
  StyledGameScreenContainer,
  StyledDinerImageContainer,
  StyledTeamModeImageContainer,
  StyledTextFieldContainer,
  StyledCustomButton,
  StyledThemeSwitchContainer,
  StyledGameContainer,
} from './GameScreen.style';
import useGameActions from 'hooks/useGameActions';
import DarkLightModeSwitch from 'components/DarkLightModeSwitch/DarkLightModeSwitch';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import { setGameOver } from 'redux/features/gameSlice/gameSlice';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const GameScreen = () => {
  const dispatch = useAppDispatch();
  const {
    game,
    setGame,
    getWinnersPlayers,
    checkIfPlayerWin,
    checkIfPlayerLost,
    checkIfGameIsOver,
    ifPlayerOnLostPlayers,
    ifPlayerOnWinnersPlayers,
    isGameOverRef,
    resetGame,
  } = useGameActions();
  const {
    register,
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  });

  const endGameAction = () => {
    dispatch(setGameOver());
  };

  const replayGameAction = () => {
    resetRoundsAndPlayersScore();
  };

  const { handleAlertClose, handleAlertOpen, isAlertOpen } = useModalAlert();
  const renderAlertDialog = () => {
    return (
      <Dialog
        open={isAlertOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAlertClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Quitter le jeu ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Vous êtes sur le point de quitter le jeu, êtes-vous sûr ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAlertClose}
            variant="contained"
            color={'info'}
            sx={{ textTransform: 'capitalize' }}
          >
            Non
          </Button>
          <Button
            onClick={endGameAction}
            variant="contained"
            color={'error'}
            sx={{ textTransform: 'capitalize' }}
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const renderPlayerName = () => {
    return (
      <StyledPlayerNameContainer>
        {game.players.map((player, index) => (
          <Typography variant="h6" key={index}>
            {player.name}
          </Typography>
        ))}
      </StyledPlayerNameContainer>
    );
  };

  const RoundsScore = () => {
    return (
      <Grid>
        <StyledRoundsScoreContainer>
          <h3>1</h3>
          {game.players.map((player, index) => (
            <StyledTextFieldContainer key={`player${index}`}>
              <StyledTextField
                placeholder="0"
                id={`player${index}`}
                key={index}
                {...register(`${player.name}round${1}`, {
                  required: 'This number is required .',
                  pattern: { value: /^[0-9]*$/, message: 'Please enter a valid number' },
                })}
                defaultValue={0}
                size="small"
                onFocus={() => setValue(`${player.name}round${1}`, '')}
                disabled={game.rounds.length >= 1}
              />
              {errors && errors[`${player.name}round${1}`]?.message && (
                <Typography variant="subtitle2" color="error" textAlign={'center'}>
                  {String(errors[`${player.name}round${1}`]?.message)}
                </Typography>
              )}
            </StyledTextFieldContainer>
          ))}
          <StyledCustomButton
            disabled={!isValid || game.rounds.length >= 1}
            onClick={handleSubmit((data) => {
              handleAddNewRowScore(data);
            })}
          >
            <DoneOutlineIcon
              sx={{
                color: !isValid || game.rounds.length >= 1 ? 'grey' : 'white',
              }}
            />
          </StyledCustomButton>
        </StyledRoundsScoreContainer>
        {game.rounds.map((round, index) => (
          <StyledRoundsScoreContainer key={`field${index}`}>
            <h3>{round.roundNumber + 1}</h3>
            {game.players.map((player, key) => (
              <StyledTextFieldContainer key={key}>
                <StyledTextField
                  id={`field${index}`}
                  key={index}
                  {...register(`${player.name}round${index + 2}`, {
                    required: 'This number is required .',
                    pattern: { value: /^[0-9]*$/, message: 'Please enter a valid number' },
                  })}
                  placeholder="0"
                  defaultValue={0}
                  size="small"
                  onFocus={() => setValue(`${player.name}round${index + 2}`, '')}
                  disabled={
                    index !== game.rounds.length - 1 ||
                    checkIfPlayerWin(player) ||
                    ifPlayerOnLostPlayers(player) ||
                    checkIfGameIsOver()
                  }
                />
                {errors && errors[`${player.name}round${index + 2}`]?.message && (
                  <Typography variant="subtitle2" color="error">
                    {String(errors[`${player.name}round${index + 2}`]?.message)}
                  </Typography>
                )}
              </StyledTextFieldContainer>
            ))}
            <StyledCustomButton
              disabled={index !== game.rounds.length - 1 || checkIfGameIsOver()}
              onClick={handleSubmit((data) => {
                handleAddNewRowScore(data);
              })}
            >
              <DoneOutlineIcon
                sx={{
                  color: index !== game.rounds.length - 1 || checkIfGameIsOver() ? 'grey' : 'white',
                }}
              />
            </StyledCustomButton>
          </StyledRoundsScoreContainer>
        ))}
      </Grid>
    );
  };

  const handleAddNewRowScore = React.useCallback(
    (data: FieldValues) => {
      const rounds = game.rounds;
      const isGameOver = isGameOverRef.current;

      if (isGameOver) {
        console.log('Game is over');
        return;
      }

      rounds.push({
        roundNumber: rounds.length + 1,
        playersScore: game.players.map((player, index) => {
          return {
            playerIndex: index + 1,
            score: parseInt(data[`${player.name}round${rounds.length + 1}`]),
          };
        }),
      });

      setGame((prevState) => {
        return {
          ...prevState,
          players: prevState.players.map((player) => {
            return {
              name: player.name,
              playerIndex: player.playerIndex,
              score: player.score + parseInt(data[`${player.name}round${rounds.length}`]),
            };
          }),
          rounds: rounds,
        };
      });

      getWinnersPlayers(game.players);
    },
    [game, getWinnersPlayers, isGameOverRef],
  );

  const renderResults = () => {
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

  const resetRoundsAndPlayersScore = () => {
    resetForm();
    resetGame();
  };

  const GameDetails = () => (
    <StyledGameDetailsContainer>
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'}>
          Partie : {game.gameType} - Nombre des joueurs : {game.players.length}
        </Typography>
      </StyledInlineTypography>
      {game.team && (
        <StyledTeamModeImageContainer>
          <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
            Mode équipe activé
          </Typography>
          <img src={images.TEAMWORK} alt="team" width="50" />
        </StyledTeamModeImageContainer>
      )}
      <StyledInlineTypography>
        <Typography variant="h5" fontFamily={'sans-serif'} textAlign={'center'}>
          Score à atteindre : {''}
          {game.finalScore}
        </Typography>
      </StyledInlineTypography>
    </StyledGameDetailsContainer>
  );

  const GameActions = () => (
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

  const PlayerNames = () => <Grid>{renderPlayerName()}</Grid>;

  const GameResults = () => <Grid>{renderResults()}</Grid>;

  const { handleThemeModeChange } = useThemeModeSwitch();

  return (
    <StyledGameScreenContainer>
      <StyledThemeSwitchContainer>
        <DarkLightModeSwitch onChangeAction={handleThemeModeChange} />
      </StyledThemeSwitchContainer>
      <GameDetails />
      <StyledGameContainer>
        <GameActions />
        <Divider />
        <PlayerNames />

        <RoundsScore />
        {isAlertOpen && renderAlertDialog()}
        <Divider />
        <GameResults />
      </StyledGameContainer>
    </StyledGameScreenContainer>
  );
};

export default GameScreen;

/* eslint-disable sonarjs/no-duplicate-string */
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DarkLightModeSwitch from 'components/DarkLightModeSwitch/DarkLightModeSwitch';
import useGameActions from 'hooks/useGameActions';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { setGameOver } from 'redux/features/gameSlice/gameSlice';
import { useAppDispatch } from 'redux/hooks';
import useModalAlert from '../../../hooks/useModalAlert';
import GameDetails from '../Components/GameDetailsCard/GameDetails';
import GameResultRow from '../Components/GameResultRow/GameResultRow';
import PlayersNameRow from '../Components/PlayersNameRow/PlayersNameRow';
import {
  StyledGameContainer,
  StyledGameScreenContainer,
  StyledThemeSwitchContainer,
} from './GameScreen.style';
import GameResultAndActions from '../Components/GameResultAndActions/GameResultAndActions';
import RoundRow from '../Components/RoundRow/RoundRow';
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

  const RoundsScore = () => {
    return (
      <Grid>
        <RoundRow
          roundNumber={1}
          game={game}
          register={register}
          setValue={setValue}
          errors={errors}
          handleSubmit={handleSubmit}
          handleAddNewRowScore={handleAddNewRowScore}
          isValid={isValid}
          checkIfPlayerWin={checkIfPlayerWin}
          isTextFieldDisabled={game.rounds.length >= 1}
          isButtonDisabled={!isValid || game.rounds.length >= 1}
        />

        {game.rounds.map((round, index) => (
          <RoundRow
            key={`field${index}`}
            roundNumber={round.roundNumber + 1}
            game={game}
            register={register}
            setValue={setValue}
            errors={errors}
            handleSubmit={handleSubmit}
            handleAddNewRowScore={handleAddNewRowScore}
            isValid={isValid}
            checkIfPlayerWin={checkIfPlayerWin}
            isButtonDisabled={index !== game.rounds.length - 1 || checkIfGameIsOver()}
            isTextFieldDisabled={
              index !== game.rounds.length - 1 || checkIfGameIsOver()
              // checkIfPlayerWin(player) ||
              // ifPlayerOnLostPlayers(player) ||
            }
          />
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

  const resetRoundsAndPlayersScore = () => {
    resetForm();
    resetGame();
  };

  const { handleThemeModeChange } = useThemeModeSwitch();

  return (
    <StyledGameScreenContainer>
      <StyledThemeSwitchContainer>
        <DarkLightModeSwitch onChangeAction={handleThemeModeChange} />
      </StyledThemeSwitchContainer>
      <GameDetails game={game} />
      <StyledGameContainer>
        <GameResultAndActions
          game={game}
          checkIfGameIsOver={checkIfGameIsOver}
          checkIfPlayerWin={checkIfPlayerWin}
          handleAlertOpen={handleAlertOpen}
          replayGameAction={replayGameAction}
        />
        <Divider />
        <PlayersNameRow game={game} />

        <RoundsScore />
        {isAlertOpen && renderAlertDialog()}
        <Divider />
        <GameResultRow
          game={game}
          ifPlayerOnWinnersPlayers={ifPlayerOnWinnersPlayers}
          ifPlayerOnLostPlayers={ifPlayerOnLostPlayers}
        />
      </StyledGameContainer>
    </StyledGameScreenContainer>
  );
};

export default GameScreen;

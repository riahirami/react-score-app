/* eslint-disable sonarjs/no-duplicate-string */
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Button, Grid, Typography } from '@mui/material';
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
  StyledCustomButton,
  StyledGameContainer,
  StyledGameScreenContainer,
  StyledRoundsScoreContainer,
  StyledTextField,
  StyledTextFieldContainer,
  StyledThemeSwitchContainer,
} from './GameScreen.style';
import GameResultAndActions from '../Components/GameResultAndActions/GameResultAndActions';
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

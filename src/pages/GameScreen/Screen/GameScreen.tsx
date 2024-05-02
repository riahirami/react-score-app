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
import LanguageSwitch from 'components/LanguageSwitch/LanguageSwitch';
import PlayWinAudio from 'components/PlayWinAudio/PlayWinAudio';
import useGameActions from 'hooks/useGameActions';
import useLanguageChange from 'hooks/useLanguageChange';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import React, { useCallback } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { setGameOver } from 'redux/features/gameSlice/gameSlice';
import { useAppDispatch } from 'redux/hooks';
import { audio } from 'utils/audio';
import useModalAlert from '../../../hooks/useModalAlert';
import GameDetails from '../Components/GameDetailsCard/GameDetails';
import GameResultAndActions from '../Components/GameResultAndActions/GameResultAndActions';
import GameResultRow from '../Components/GameResultRow/GameResultRow';
import PlayersNameRow from '../Components/PlayersNameRow/PlayersNameRow';
import RoundRow from '../Components/RoundRow/RoundRow';
import {
  StyledExitModalButtonContainer,
  StyledGameContainer,
  StyledGameScreenContainer,
  StyledThemeSwitchContainer,
} from './GameScreen.style';
import useDesignDirection from 'hooks/useDesignDirection';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const GameScreen = () => {
  const { handleThemeModeChange } = useThemeModeSwitch();
  const { changeLanguage, currentLanguage } = useLanguageChange();
  const { t } = useTranslation();
  const { direction } = useDesignDirection();
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

  const endGameAction = () => {
    dispatch(setGameOver());
  };

  const replayGameAction = () => {
    resetRoundsAndPlayersScore();
  };

  const resetRoundsAndPlayersScore = () => {
    resetForm();
    resetGame();
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
        dir={direction}
      >
        <DialogTitle>{t('Modal.Exit.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {t('Modal.Exit.content')}
          </DialogContentText>
        </DialogContent>
        <StyledExitModalButtonContainer>
          <Button
            onClick={handleAlertClose}
            variant="contained"
            color={'primary'}
            sx={{ textTransform: 'capitalize' }}
          >
            {t('Modal.Common.No')}
          </Button>
          <Button
            onClick={endGameAction}
            variant="contained"
            color={'error'}
            sx={{ textTransform: 'capitalize' }}
          >
            {t('Modal.Common.Yes')}
          </Button>
        </StyledExitModalButtonContainer>
      </Dialog>
    );
  };

  const handleRemoveScoreRow = useCallback(
    (rowNumber: number) => {
      const rounds = game.rounds;

      const newRounds = rounds.filter((round) => round.roundNumber === rowNumber);

      setGame((prevState) => {
        return {
          ...prevState,
          players: prevState.players.map((player) => {
            return {
              name: player.name,
              playerIndex: player.playerIndex,
              score: player.score - newRounds[0].playersScore[player.playerIndex - 1].score,
            };
          }),
          rounds: rounds.filter((round) => round.roundNumber !== rowNumber),
        };
      });
    },
    [game, getWinnersPlayers, isGameOverRef],
  );

  const handleAddNewScoreRow = useCallback(
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

  const formMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  });

  const handleSubmit = formMethods.handleSubmit((data) => {
    handleAddNewScoreRow(data);
  });

  const isValid = formMethods.formState.isValid;

  const resetForm = formMethods.reset;

  const RoundsScore = () => {
    return (
      <Grid>
        <FormProvider {...formMethods}>
          <RoundRow
            roundNumber={1}
            game={game}
            handleSubmit={handleSubmit}
            handleRemoveScoreRow={handleRemoveScoreRow}
            isValid={isValid}
            checkIfPlayerWin={checkIfPlayerWin}
            isTextFieldDisabled={game.rounds.length >= 1}
            isButtonAddDisabled={game.rounds.length >= 1}
            isButtonRemoveDisabled={game.rounds.length !== 1}
            pendingRound={1 === game.rounds.length + 1}
          />

          {game.rounds.map((round, index) => (
            <RoundRow
              key={`field${index}`}
              roundNumber={round.roundNumber + 1}
              game={game}
              handleSubmit={handleSubmit}
              handleRemoveScoreRow={handleRemoveScoreRow}
              isValid={isValid}
              checkIfPlayerWin={checkIfPlayerWin}
              isButtonAddDisabled={index !== game.rounds.length - 1 || checkIfGameIsOver()}
              isTextFieldDisabled={
                index !== game.rounds.length - 1 || checkIfGameIsOver()
                // checkIfPlayerWin(player) ||
                // ifPlayerOnLostPlayers(player) ||
              }
              isButtonRemoveDisabled={game.rounds.length !== round.roundNumber + 1}
              pendingRound={index === game.rounds.length - 1 && !checkIfGameIsOver()}
            />
          ))}
        </FormProvider>
      </Grid>
    );
  };
  return (
    <StyledGameScreenContainer>
      <StyledThemeSwitchContainer>
        <DarkLightModeSwitch onChangeAction={handleThemeModeChange} />
        <LanguageSwitch onChangeLanguageAction={changeLanguage} currentLanguage={currentLanguage} />
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
        <PlayWinAudio shouldPlayAudio={checkIfGameIsOver()} audioSrc={audio.AUDIO} />
      </StyledGameContainer>
    </StyledGameScreenContainer>
  );
};

export default GameScreen;

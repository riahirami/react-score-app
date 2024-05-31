/* eslint-disable sonarjs/no-duplicate-string */
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import PlayWinAudio from 'components/PlayWinAudio/PlayWinAudio';
import ScreenHeader from 'components/ScreenHeader/ScreenHeader';
import useFirebaseActions from 'hooks/useFirebaseActions';
import useGameActions from 'hooks/useGameActions';
import useLanguageChange from 'hooks/useLanguageChange';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { GameFbResponse, Player, Round } from 'types/interfaces/game';
import { audio } from 'utils/audio';
import GameDetails from '../../Components/GameDetailsCard/GameDetails';
import GameResultAndActions from '../../Components/GameResultAndActions/GameResultAndActions';
import GameResultRow from '../../Components/GameResultRow/GameResultRow';
import PlayersNameRow from '../../Components/PlayersNameRow/PlayersNameRow';
import RoundRow from '../../Components/RoundRow/RoundRow';
import { StyledGameContainer, StyledGameScreenContainer } from './GameScreen.style';
import { setGameCode } from 'redux/features/gameSlice/gameSlice';
import { useAppDispatch } from 'redux/hooks';
import { setLoaderInvisible, setLoaderVisible } from 'redux/features/loader/loaderSlice';

const GameScreen = () => {
  const { handleThemeModeChange } = useThemeModeSwitch();
  const { changeLanguage, currentLanguage } = useLanguageChange();
  const { state } = useLocation();
  const { updateRoundScoresOnFb, deleteRoundFromFb, listenForGameUpdates, fetchGameDetailsById } =
    useFirebaseActions();
  const [game, setGame] = useState<GameFbResponse>(state.game);

  const gameCode = state.game.gameId;
  const gameKey = state.game.key;
  const {
    getWinnersPlayers,
    checkIfPlayerWin,
    checkIfGameIsOver,
    ifPlayerOnLostPlayers,
    ifPlayerOnWinnersPlayers,
    isGameOverRef,
    resetGame,
  } = useGameActions(game, setGame);

  const replayGameAction = () => {
    resetRoundsAndPlayersScore();
  };

  const dispatch = useAppDispatch();

  const initiateGame = async (): Promise<boolean> => {
    dispatch(setLoaderVisible());
    try {
      const data = await fetchGameDetailsById(gameCode);
      setGame(data);
      return data ? true : false;
    } catch (error) {
      setGame(state.game);
      return false;
    } finally {
      dispatch(setLoaderInvisible());
    }
  };

  const roundsEndRef = useRef<null | HTMLHRElement>(null);
  const scrollToBottom = () => {
    roundsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    const initData = void initiateGame();
    if (initData) {
      scrollToBottom();
    }
  }, [gameCode]);

  useEffect(() => {
    dispatch(setGameCode(gameCode));
    const unsubscribe = listenForGameUpdates(gameKey);
    return () => {
      unsubscribe();
    };
  }, [gameKey]);

  const resetRoundsAndPlayersScore = async () => {
    resetForm();
    resetGame();
    const newGame = {
      ...game,
      rounds: [],
      players: game.players.map((player: Player) => {
        return {
          ...player,
          score: 0,
        };
      }),
    };
    try {
      // Update round scores on Firebase
      await updateRoundScoresOnFb(game.key, newGame);
      setGame(newGame);
    } catch (error) {
      console.log('Error updating round scores :', error);
    }
  };

  const handleRemoveScoreRow = useCallback(
    (rowNumber: number) => {
      const rounds = game.rounds;

      const newRounds = rounds.filter((item: Round) => item.roundNumber === rowNumber);
      deleteRoundFromFb(game.key, rowNumber);
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
          rounds: rounds.filter((item: Round) => item.roundNumber !== rowNumber),
        };
      });
    },
    [game, getWinnersPlayers, isGameOverRef],
  );

  const handleAddNewScoreRow = useCallback(
    async (data: FieldValues) => {
      const rounds = game.rounds || [];
      const isGameOver = isGameOverRef.current;

      if (isGameOver) {
        console.log('Game is over');
        return;
      }

      const newRound = {
        roundNumber: rounds.length + 1,
        playersScore: game.players.map((player: Player, index: number) => {
          return {
            playerIndex: index + 1,
            score: parseInt(data[`${player.name}round${rounds.length + 1}`]),
          };
        }),
      };

      // Update local state
      const updatedGame = {
        ...game,
        players: game.players.map((player) => ({
          ...player,
          score: player.score + parseInt(data[`${player.name}round${rounds.length + 1}`]),
        })),
        rounds: [...rounds, newRound], // Add the new round to the rounds array
      };

      setGame(updatedGame);
      try {
        // Update round scores on Firebase
        await updateRoundScoresOnFb(game.key, updatedGame);
      } catch (error) {
        console.log('Error updating round scores :', error);
      }
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
    scrollToBottom();
  });

  const isValid = formMethods.formState.isValid;

  const resetForm = formMethods.reset;

  const RoundsScore = () => {
    return (
      <Grid>
        <FormProvider {...formMethods}>
          <RoundRow
            key={`round1`}
            roundNumber={1}
            game={game}
            handleSubmit={handleSubmit}
            handleRemoveScoreRow={handleRemoveScoreRow}
            isValid={isValid}
            checkIfPlayerWin={checkIfPlayerWin}
            isTextFieldDisabled={game?.rounds?.length >= 1}
            isButtonAddDisabled={game?.rounds?.length >= 1}
            isButtonRemoveDisabled={game?.rounds?.length !== 1}
            pendingRound={1 === game?.rounds?.length + 1}
          />

          {game?.rounds?.map((round: Round, index: number) => (
            <RoundRow
              key={`round${index}`}
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
      {game && (
        <ScreenHeader
          handleThemeModeChange={handleThemeModeChange}
          changeLanguage={changeLanguage}
          currentLanguage={currentLanguage}
          gameCode={gameCode}
          isPreviewMode={false}
          isScreenGame={true}
        />
      )}
      {game && <GameDetails game={game} />}
      {game && (
        <StyledGameContainer>
          <GameResultAndActions
            game={game}
            checkIfGameIsOver={checkIfGameIsOver}
            checkIfPlayerWin={checkIfPlayerWin}
            replayGameAction={replayGameAction}
          />
          <PlayersNameRow game={game} />

          <RoundsScore />
          <Divider ref={roundsEndRef} />
          <GameResultRow
            game={game}
            ifPlayerOnWinnersPlayers={ifPlayerOnWinnersPlayers}
            ifPlayerOnLostPlayers={ifPlayerOnLostPlayers}
          />
          <PlayWinAudio shouldPlayAudio={checkIfGameIsOver()} audioSrc={audio.AUDIO} />
        </StyledGameContainer>
      )}
    </StyledGameScreenContainer>
  );
};

export default GameScreen;

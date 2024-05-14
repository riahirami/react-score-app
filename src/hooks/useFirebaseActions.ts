import { RouteIdEnum } from 'config/enums';
import { db } from 'config/firebase';
import {
  ref as fbRef,
  get,
  getDatabase,
  off,
  onChildChanged,
  onValue,
  push,
  set,
  update,
} from 'firebase/database';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGameCode } from 'redux/features/gameSlice/gameSlice';
import { setLoaderInvisible, setLoaderVisible } from 'redux/features/loader/loaderSlice';
import { GameFbResponse, Round } from 'types/interfaces/game';
import { GameAttributes } from 'types/models/Game/Games';
import { deviceUniqueID, randomGameCode } from 'utils/helpers/helpers';
import { getPersistData, persistData } from 'utils/helpers/storage.helpers';
interface UseFirebaseActionsProps {
  fetchGamesDetails: () => Promise<GameFbResponse[]>;
  fetchGameDetailsById: (gameId: string) => Promise<GameFbResponse>;

  createGameOnFb: (data: GameAttributes) => void;
  updateRoundScoresOnFb: (gameId: string, updatedRounds: GameFbResponse) => Promise<void>;
  listenForGameUpdates: (gameId: string | undefined) => () => void;
  deleteRoundFromFb: (gameId: string, roundId: number) => Promise<void>;
  setGameDetails: React.Dispatch<React.SetStateAction<GameFbResponse | undefined>>;
  gameDetails: GameFbResponse | undefined;
  finishGameOnFb: (gameId: string) => Promise<void>;
  findUserGames: (userId: string) => Promise<GameFbResponse[]>;
}

const useFirebaseActions = (): UseFirebaseActionsProps => {
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState<GameFbResponse | undefined>(undefined);

  const [gamesList, setGamesList] = useState<GameFbResponse[]>([]);

  const fetchGamesDetails = async (): Promise<GameFbResponse[]> => {
    try {
      const gamesRef = fbRef(db, 'games');
      const gamesSnapshot = await get(gamesRef);
      if (gamesSnapshot.exists()) {
        return gamesSnapshot.val();
      } else {
        return [];
      }
    } catch (error) {
      console.log('Error getting games', error);
      return [];
    }
  };

  const fetchGameDetailsById = async (gameCode: string): Promise<GameFbResponse> => {
    const gameRef = fbRef(db, 'games');
    const gameSnapshot = await get(gameRef);
    try {
      if (gameSnapshot.exists()) {
        let foundGameData: GameFbResponse | undefined;
        gameSnapshot.forEach((childSnapshot) => {
          const gameData = childSnapshot.val();
          if (gameData.gameId === gameCode) {
            foundGameData = gameData;
          }
        });
        if (foundGameData) {
          setGameDetails(foundGameData);
          return foundGameData;
        } else {
          throw new Error('Game not found');
        }
      } else {
        throw new Error('No data available');
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const createGameOnFb = (data: GameAttributes) => {
    const playersNumber = data.team ? data.playersNumber / 2 : data.playersNumber;
    const gameCode = randomGameCode();
    const userId = getPersistData('userId', false) ?? deviceUniqueID();
    try {
      const newGame = push(fbRef(db, '/games/'));

      const gameData = {
        gameId: gameCode,
        gameType: data.gameType,
        playersNumber: playersNumber,
        finalScore: data.finalScore,
        players: data.playersName?.map((player, index) => ({
          playerIndex: index + 1,
          name: player,
          score: 0,
        })),
        team: data.team,
        createdBy: userId,
        isGameOver: false,
        rounds: [],
        key: newGame.key,
      };
      set(newGame, gameData);
      persistData('userId', userId);
      navigate(RouteIdEnum.GameScreen, {
        state: { game: gameData },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoundScoresOnFb = async (gameKey: string, updatedGame: GameFbResponse) => {
    const gameRef = fbRef(db, `/games/${gameKey}`);
    try {
      await update(gameRef, {
        rounds: updatedGame.rounds,
        players: updatedGame.players,
      });
      console.log('Scores updated successfully');
    } catch (error) {
      console.error('Error updating round scores on Firebase:', error);
      throw error;
    }
  };

  const listenForGameUpdates = (gameKey: string | undefined) => {
    const gameRef = fbRef(db, `/games/${gameKey}`);

    onChildChanged(gameRef, (snapshot) => {
      const key = snapshot.key;
      const value = snapshot.val();

      if (key == 'rounds') {
        const updatedGame = {
          ...gameDetails,
          rounds: value,
        };
        setGameDetails(updatedGame as GameFbResponse);
      }

      if (key == 'players') {
        const updatedGame = {
          ...gameDetails,
          players: value,
        };
        setGameDetails(updatedGame as GameFbResponse);
      }
    });

    return () => off(gameRef, 'value', () => {});
  };

  const deleteRoundFromFb = async (gameId: string, roundId: number) => {
    const gameRef = fbRef(db, `/games/${gameId}`);
    const gameSnapshot = await get(gameRef);
    if (gameSnapshot.exists()) {
      const gameData = gameSnapshot.val();
      const updatedRounds = gameData.rounds.filter((round: Round) => round.roundNumber !== roundId);
      try {
        await update(gameRef, {
          rounds: updatedRounds,
        });
        console.log('Round deleted successfully on Firebase');
      } catch (error) {
        console.error('Error deleting round on Firebase:', error);
        throw error;
      }
    }
  };

  const finishGameOnFb = async (gameId: string) => {
    const gameRef = fbRef(db, `/games/${gameId}`);
    const gameSnapshot = await get(gameRef);
    if (gameSnapshot.exists()) {
      try {
        await update(gameRef, {
          isGameOver: true,
        });
        console.log('Game finished successfully on Firebase');
      } catch (error) {
        console.error('Error finishing game on Firebase:', error);
        throw error;
      }
    }
  };

  const findUserGames = async (userId: string) => {
    const gamesRef = fbRef(db, 'games');
    const gamesSnapshot = await get(gamesRef);
    if (gamesSnapshot.exists()) {
      const userGames: GameFbResponse[] = [];
      gamesSnapshot.forEach((childSnapshot) => {
        const gameData = childSnapshot.val();
        if (gameData.createdBy === userId) {
          userGames.push(gameData);
        }
      });
      return userGames;
    } else {
      return [];
    }
  };

  return {
    fetchGamesDetails,
    fetchGameDetailsById,
    createGameOnFb,
    gameDetails,
    updateRoundScoresOnFb,
    listenForGameUpdates,
    deleteRoundFromFb,
    setGameDetails,
    finishGameOnFb,
    findUserGames,
  };
};

export default useFirebaseActions;

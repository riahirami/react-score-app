import { Grid } from '@mui/material';
import { RouteIdEnum } from 'config/enums';
import { db } from 'config/firebase';
import { get, ref } from 'firebase/database';
import useFirebaseActions from 'hooks/useFirebaseActions';
import { translate } from 'locales/i18n';
import { forEach } from 'lodash';
import GameCard from 'pages/GameScreen/Components/GameCard/GameCard';
import GameOverModal from 'pages/GameSettings/Components/GameOverModal/GameOverModal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLoaderInvisible, setLoaderVisible } from 'redux/features/loader/loaderSlice';
import { openModal, setModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch } from 'redux/hooks';
import { GameFbResponse } from 'types/interfaces/game';
import { getPersistData } from 'utils/helpers/storage.helpers';

export const ListGames = () => {
  const { findUserGames } = useFirebaseActions();
  const [gameList, setGameList] = useState<GameFbResponse[]>([]);
  const userId = getPersistData('userId', false);

  const getData = async () => {
    dispatch(setLoaderVisible());
    try {
      const games = await findUserGames(userId);
      setGameList(games);
    } catch (error) {
      console.log('Error getting games', error);
    } finally {
      dispatch(setLoaderInvisible());
    }
  };

  useEffect(() => {
    getData();

    return () => {
      setGameList([]);
    };
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateToGameScreen = (gameData: GameFbResponse) => {
    if (gameData.isGameOver) {
      dispatch(
        setModal({
          content: <GameOverModal />,
          title: translate('Modal.Game_Over.title'),
          hasConfirmButton: false,
        }),
      );
      dispatch(openModal());
    } else
      navigate(RouteIdEnum.GameScreen, {
        state: { game: gameData },
      });
  };
  const handleSubmitGameCode = async (gameId: string) => {
    const gameRef = ref(db, 'games');
    dispatch(setLoaderVisible());
    try {
      const snapshot = await get(gameRef);
      if (snapshot.exists()) {
        const gameData = snapshot.val();
        forEach(gameData, (game) => {
          if (game.gameId === gameId) {
            handleNavigateToGameScreen(game);
          }
        });
      }
    } catch (error) {
      console.log('Error getting data:', error);
    } finally {
      dispatch(setLoaderInvisible());
    }
  };

  return (
    <Grid>
      {gameList.map((game) => {
        return <GameCard key={game.key} game={game} handleResumeGame={handleSubmitGameCode} />;
      })}
    </Grid>
  );
};

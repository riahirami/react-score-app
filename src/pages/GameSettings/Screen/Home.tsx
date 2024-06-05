/* eslint-disable sonarjs/no-duplicate-string */
import ScreenHeader from 'components/ScreenHeader/ScreenHeader';
import { RouteIdEnum } from 'config/enums/routes.enum';
import { ref as dbRef, get } from 'firebase/database';
import useLanguageChange from 'hooks/useLanguageChange';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import MainLayout from 'layouts/mainLayout/MainLayout';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { GameFbResponse } from 'types/interfaces/game';
import { GameAttributes } from 'types/models/Game/Games';
import { ModalTypeEnum, ThemeEnum } from 'utils/enum';
import { getPersistData, persistData } from 'utils/helpers/storage.helpers';
import GameStartSection from '../Components/GameStartSection/GameStartSection';
import { StyledContainer } from './home.styles';
import { db } from 'config/firebase';
import { setLoaderInvisible, setLoaderVisible } from 'redux/features/loader/loaderSlice';
import CustomModal from 'components/CustomModal/CustomModal';
import useModal from 'hooks/useModal';
import { env } from 'config/env';

const Home = () => {
  const { reset } = useForm<GameAttributes>();
  const navigate = useNavigate();
  const { handleThemeModeChange } = useThemeModeSwitch();
  const { changeLanguage, currentLanguage } = useLanguageChange();
  const {
    isModalOpen,
    modalContent,
    modalType,
    handleNewGameAction,
    handleAuthorizedAction,
    handleGameOver,
    handleJoinGameAction,
    handleResumeGameAction,
    handleModalTitle,
    handleInexistentGame,
  } = useModal();
  const dispatch = useAppDispatch();
  const formMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  });

  const handleNavigateToScreen = (
    gameData: GameFbResponse,
    destinationRoute: RouteIdEnum,
    data?: FieldValues,
  ) => {
    console.log('data & gameData :', data, gameData);
    if (gameData.isGameOver) {
      handleGameOver();
    } else if (gameData.createdBy !== getPersistData('userId', false)) {
      handleAuthorizedAction();
    } else {
      if (destinationRoute === RouteIdEnum.GameScreen) {
        navigate(destinationRoute, {
          state: { game: gameData },
        });
      } else if (destinationRoute === RouteIdEnum.GameScreenPreview && data) {
        window.location.href = `${env.url}/join-game/${data.gameCode}`;
      }
    }
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleSubmitGameCode = (isResumeAction: boolean) =>
    formMethods.handleSubmit(async (data: FieldValues) => {
      const gameRef = dbRef(db, 'games');
      const gameSnapshot = await get(gameRef);
      dispatch(setLoaderVisible());
      try {
        if (gameSnapshot.exists()) {
          gameSnapshot.forEach((childSnapshot) => {
            const gameData = childSnapshot.val();

            if (gameData.key === data.gameCode || gameData.gameId === data.gameCode) {
              if (isResumeAction) {
                handleNavigateToScreen(gameData, RouteIdEnum.GameScreen);
              } else {
                handleNavigateToScreen(gameData, RouteIdEnum.GameScreenPreview, data);
              }
              return gameData;
            } else if (gameData.key !== data?.gameCode || gameData.gameId !== data?.gameCode) {
              console.log('gameData ', gameData);
              console.log('data ', data);
              handleInexistentGame();
            }
          });
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.log('Error getting data:', error);
      } finally {
        dispatch(setLoaderInvisible());
      }
    });

  useEffect(() => {
    persistData('theme', ThemeEnum.LIGHT);
  }, []);

  const handleListGameAction = () => {
    navigate(RouteIdEnum.ListGames);
  };

  const handlePreviewCodeSubmit = handleSubmitGameCode(false);
  const handleResumeGameSubmit = handleSubmitGameCode(true);

  const handleConfirmModalAction = () => {
    switch (modalType) {
      case ModalTypeEnum.JOIN_GAME:
        handlePreviewCodeSubmit();
        break;
      case ModalTypeEnum.RESUME_GAME:
        handleResumeGameSubmit();
        break;
      case ModalTypeEnum.GAME_SETTINGS:
        if (modalContent && modalContent.confirmAction) {
          modalContent.confirmAction();
        }
        break;
      default:
        console.log('default');
        break;
    }
  };

  const handleNewGameSubmit = () => {
    handleNewGameAction(() => RouteIdEnum.GameScreen);
  };

  const handleJoinGame = () => {
    handleJoinGameAction(() => handleSubmitGameCode(false));
  };

  const handleResumeGame = () => {
    handleResumeGameAction(() => handleSubmitGameCode(true));
  };

  return (
    <StyledContainer>
      <MainLayout>
        {isModalOpen && modalType && (
          <CustomModal
            title={handleModalTitle()}
            confirmAction={handleConfirmModalAction}
            hasConfirmButton={modalContent?.hasConfirmButton}
            hasCancelButton={modalContent?.hasCancelButton}
            confirmText={modalContent?.confirmText}
            cancelText={modalContent?.cancelText}
            type={modalType}
            data={formMethods}
          />
        )}
        <ScreenHeader
          handleThemeModeChange={handleThemeModeChange}
          changeLanguage={changeLanguage}
          currentLanguage={currentLanguage}
          isPreviewMode={false}
          isScreenGame={false}
        />
        <GameStartSection
          handleNewGameAction={handleNewGameSubmit}
          handleJoinGame={handleJoinGame}
          handleResumeGame={handleResumeGame}
          handleListGameAction={handleListGameAction}
        />
      </MainLayout>
    </StyledContainer>
  );
};

export default Home;

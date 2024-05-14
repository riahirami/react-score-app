import ScreenHeader from 'components/ScreenHeader/ScreenHeader';
import { RouteIdEnum } from 'config/enums/routes.enum';
import { ref as dbRef, get } from 'firebase/database';
import useLanguageChange from 'hooks/useLanguageChange';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import MainLayout from 'layouts/mainLayout/MainLayout';
import { ReactNode, useEffect } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { openModal, setModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch } from 'redux/hooks';
import { GameFbResponse } from 'types/interfaces/game';
import { GameAttributes } from 'types/models/Game/Games';
import { ThemeEnum } from 'utils/enum';
import { getPersistData, persistData } from 'utils/helpers/storage.helpers';
import CustomModalContent from '../Components/CustomModalContent/CustomModalContent';
import GameOverModal from '../Components/GameOverModal/GameOverModal';
import GameSettingsModal from '../Components/GameSettingsModal/GameSettingsModal';
import GameStartSection from '../Components/GameStartSection/GameStartSection';
import { JoinGameModal } from '../Components/JoinGameModal/JoinGameModal';
import { StyledContainer } from './home.styles';
import { translate } from 'locales/i18n';
import { db } from 'config/firebase';
import { setLoaderInvisible, setLoaderVisible } from 'redux/features/loader/loaderSlice';

const Home = () => {
  const { reset } = useForm<GameAttributes>();
  const navigate = useNavigate();
  const { handleThemeModeChange } = useThemeModeSwitch();
  const { changeLanguage, currentLanguage } = useLanguageChange();

  const dispatch = useAppDispatch();
  const formMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true,
  });

  const handleModalActions = (
    modalContent: ReactNode,
    modalTitle: string,
    modalConfirmAction: () => void,
    hasConfirmButton: boolean,
  ) => {
    dispatch(
      setModal({
        content: modalContent,
        title: modalTitle,
        confirmAction: modalConfirmAction,
        hasConfirmButton: hasConfirmButton,
      }),
    );
    dispatch(openModal());
  };

  const handleNavigateToScreen = (
    gameData: GameFbResponse,
    destinationRoute: RouteIdEnum,
    data?: FieldValues,
  ) => {
    if (gameData.isGameOver) {
      handleModalActions(<GameOverModal />, translate('Modal.Game_Over.title'), () => {}, false);
    } else if (gameData.createdBy !== getPersistData('userId', false)) {
      handleModalActions(
        <CustomModalContent contentText={translate('Modal.Unauthorized.content')} />,
        translate('Modal.Unauthorized.title'),
        () => {},
        false,
      );
    } else {
      if (destinationRoute === RouteIdEnum.GameScreen) {
        navigate(destinationRoute, {
          state: { game: gameData },
        });
      } else if (destinationRoute === RouteIdEnum.GameScreenPreview && data) {
        navigate(destinationRoute, {
          state: { gameCode: data.gameCode },
        });
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

  const handleNewGameAction = () => {
    handleModalActions(<GameSettingsModal />, 'Game Settings', () => reset(), true);
  };

  const handleGameCodeSubmit = handleSubmitGameCode(true);
  const handlePreviewCodeSubmit = handleSubmitGameCode(false);

  const handleJoinGameAction = () => {
    handleModalActions(
      <FormProvider {...formMethods}>
        <JoinGameModal />
      </FormProvider>,
      translate('Game_Actions.Join_Game'),
      () => handlePreviewCodeSubmit(),
      true,
    );
  };

  const handleResumeGameAction = () => {
    handleModalActions(
      <FormProvider {...formMethods}>
        <JoinGameModal />
      </FormProvider>,
      translate('Modal.Resume_Game.title'),
      () => handleGameCodeSubmit(),
      true,
    );
  };

  const handleListGameAction = () => {
    navigate(RouteIdEnum.ListGames);
  };

  useEffect(() => {
    persistData('theme', ThemeEnum.LIGHT);
  }, []);

  return (
    <StyledContainer>
      <MainLayout>
        <ScreenHeader
          handleThemeModeChange={handleThemeModeChange}
          changeLanguage={changeLanguage}
          currentLanguage={currentLanguage}
          isPreviewMode={false}
          isScreenGame={false}
        />
        <GameStartSection
          handleNewGameAction={handleNewGameAction}
          handleJoinGame={handleJoinGameAction}
          handleResumeGame={handleResumeGameAction}
          handleListGameAction={handleListGameAction}
        />
      </MainLayout>
    </StyledContainer>
  );
};

export default Home;

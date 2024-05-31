import { Divider, Grid } from '@mui/material';
import ScreenHeader from 'components/ScreenHeader/ScreenHeader';
import useFirebaseActions from 'hooks/useFirebaseActions';
import useLanguageChange from 'hooks/useLanguageChange';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import ExitButton from 'pages/GameScreen/Components/ExitButton/ExitButton';
import GameDetails from 'pages/GameScreen/Components/GameDetailsCard/GameDetails';
import GameResultRow from 'pages/GameScreen/Components/GameResultRow/GameResultRow';
import PlayersNameRow from 'pages/GameScreen/Components/PlayersNameRow/PlayersNameRow';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeModal } from 'redux/features/modalSlice/modalSlice';
import useDesignDirection from 'hooks/useDesignDirection';
import PreviewRoundsGameScore from 'pages/GameScreen/Components/PreviewRoundsGameScore/PreviewRoundsGameScore';

const JoinGame = () => {
  const { gameCode } = useParams();
  const { handleThemeModeChange } = useThemeModeSwitch();
  const { changeLanguage, currentLanguage } = useLanguageChange();
  const { fetchGameDetailsById, listenForGameUpdates, setGameDetails, gameDetails } =
    useFirebaseActions();

  const { direction } = useDesignDirection();

  const dispatch = useDispatch();
  const RoundsRef = useRef<HTMLHRElement | null>(null);

  const getGameDetails = async () => {
    try {
      if (gameCode) {
        const dataDetails = await fetchGameDetailsById(gameCode);
        setGameDetails(dataDetails);
        scrollToBottom();
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const scrollToBottom = () => {
    RoundsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    listenForGameUpdates(gameDetails?.key);
    getGameDetails();
  }, [gameCode, JSON.stringify(gameDetails)]);

  useEffect(() => {
    dispatch(closeModal());
  }, []);
  return (
    <Grid>
      {gameDetails && (
        <>
          <ScreenHeader
            handleThemeModeChange={handleThemeModeChange}
            changeLanguage={changeLanguage}
            currentLanguage={currentLanguage}
            gameCode={gameCode}
            isPreviewMode={true}
          />
          <GameDetails game={gameDetails} />

          <ExitButton />
          <PlayersNameRow game={gameDetails} />
          <PreviewRoundsGameScore direction={direction} gameDetails={gameDetails} />
          <Divider ref={RoundsRef} />
          <GameResultRow
            game={gameDetails}
            ifPlayerOnWinnersPlayers={() => {
              return false;
            }}
            ifPlayerOnLostPlayers={() => {
              return false;
            }}
          />
        </>
      )}
    </Grid>
  );
};
export default JoinGame;

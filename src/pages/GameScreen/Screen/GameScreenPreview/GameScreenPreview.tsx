import { Grid, Typography } from '@mui/material';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import ScreenHeader from 'components/ScreenHeader/ScreenHeader';
import useFirebaseActions from 'hooks/useFirebaseActions';
import useLanguageChange from 'hooks/useLanguageChange';
import useThemeModeSwitch from 'hooks/useThemeModeSwitch';
import ExitButton from 'pages/GameScreen/Components/ExitButton/ExitButton';
import GameDetails from 'pages/GameScreen/Components/GameDetailsCard/GameDetails';
import GameResultRow from 'pages/GameScreen/Components/GameResultRow/GameResultRow';
import PlayersNameRow from 'pages/GameScreen/Components/PlayersNameRow/PlayersNameRow';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setGameCode } from 'redux/features/gameSlice/gameSlice';
import {
  StyledGameRoundContainer,
  StyledGameRoundsGlobalContainer,
  StyledNoDataText,
  StyledRoundContainer,
} from './gameScreenPreview.style';
import { translate } from 'locales/i18n';

const GameScreenPreview = () => {
  const { state } = useLocation();
  const { handleThemeModeChange } = useThemeModeSwitch();
  const { changeLanguage, currentLanguage } = useLanguageChange();
  const { fetchGameDetailsById, listenForGameUpdates, gameDetails, setGameDetails } =
    useFirebaseActions();

  const dispatch = useDispatch();

  const gameCode = state.gameCode;
  const getGameDetails = async () => {
    try {
      if (gameCode) {
        const details = await fetchGameDetailsById(gameCode);
        setGameDetails(details);
      }
    } catch (error) {
      console.error('Error fetching game details', error);
    }
  };
  useEffect(() => {
    dispatch(setGameCode(gameCode));
  }, [gameCode]);

  useEffect(() => {
    listenForGameUpdates(gameDetails?.key);
    getGameDetails();
  }, [gameCode, JSON.stringify(gameDetails)]);
  console.log('gameDetails', gameDetails);
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
          <StyledGameRoundsGlobalContainer>
            {gameDetails?.rounds ? (
              gameDetails?.rounds.map((round, index) => (
                <StyledGameRoundContainer container key={round?.roundNumber}>
                  <CustomColumnGrid>
                    <h3>{round?.roundNumber}</h3>
                  </CustomColumnGrid>
                  {round?.playersScore.map((score) => (
                    <CustomColumnGrid
                      key={`${score.playerIndex}round${round?.roundNumber}`}
                      isMiddleGrid
                      game={gameDetails}
                    >
                      <StyledRoundContainer index={index}>
                        <Typography key={score.playerIndex}>{score?.score}</Typography>
                      </StyledRoundContainer>
                    </CustomColumnGrid>
                  ))}
                  <CustomColumnGrid></CustomColumnGrid>
                </StyledGameRoundContainer>
              ))
            ) : (
              <Grid>
                <StyledNoDataText>{translate('No_data_to_display')}</StyledNoDataText>
              </Grid>
            )}
          </StyledGameRoundsGlobalContainer>
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

export default GameScreenPreview;

import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import React from 'react';
import { DirectionType } from 'types/interfaces/global';
import {
  StyledGameRoundContainer,
  StyledGameRoundsGlobalContainer,
  StyledNoDataText,
  StyledRoundContainer,
} from './previewRoundsGameScoreStyles.phone';
import { Grid, Typography } from '@mui/material';
import { translate } from 'locales/i18n';
import { GameFbResponse } from 'types/interfaces/game';

interface PreviewRoundsGameScoreProps {
  direction: DirectionType;
  gameDetails: GameFbResponse;
}

const PreviewRoundsGameScore: React.FC<PreviewRoundsGameScoreProps> = ({
  direction,
  gameDetails,
}) => {
  return (
    <StyledGameRoundsGlobalContainer customDirection={direction}>
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
  );
};

export default PreviewRoundsGameScore;

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Grid, Typography } from '@mui/material';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Game, Player } from 'types/interfaces/game';
import {
  StyledCustomButton,
  StyledDeleteIcon,
  StyledDoneIcon,
  StyledErrorContainer,
  StyledGridContainer,
  StyledRoundsScoreContainer,
  StyledTextField,
  StyledTextFieldContainer,
} from './roundRow.style';
import { colors } from 'utils/colors';
import useDesignDirection from 'hooks/useDesignDirection';
interface RoundRowProps {
  roundNumber: number;
  game: Game;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
  handleRemoveScoreRow: (rowNumber: number) => void;
  isValid?: boolean;
  checkIfPlayerWin: (player: Player) => boolean;
  isButtonAddDisabled: boolean;
  isButtonRemoveDisabled: boolean;
  isTextFieldDisabled: boolean;

  pendingRound: boolean;
}
const RoundRow = ({
  roundNumber,
  game,
  handleSubmit,
  handleRemoveScoreRow,
  isValid,
  isButtonAddDisabled,
  isButtonRemoveDisabled,
  isTextFieldDisabled,
  pendingRound,
}: RoundRowProps) => {
  const addRowButtonWidth = isButtonRemoveDisabled ? 23 : 20;
  const addButtonIconColor =
    !isValid || game?.rounds?.length >= roundNumber ? colors.GREY : colors.WHITE;

  const { control, setValue } = useFormContext();
  const { direction } = useDesignDirection();

  const initiateFieldValues = () => {
    for (let i = 0; i < game?.players.length; i++) {
      if (!game.rounds || game.rounds.length === 0) return;
      if (roundNumber === 1 && game?.rounds[0]?.playersScore[i]?.score) {
        setValue(`${game?.players[i].name}round${1}`, game?.rounds[0]?.playersScore[i]?.score);
      } else if (roundNumber > 1 && game?.rounds[roundNumber - 1]?.playersScore[i]?.score) {
        setValue(
          `${game?.players[i].name}round${roundNumber}`,
          game?.rounds[roundNumber - 1]?.playersScore[i]?.score,
        );
      }
    }
  };

  useEffect(() => {
    initiateFieldValues();
  }, []);

  return (
    <StyledRoundsScoreContainer pendingRound={pendingRound} customDirection={direction}>
      <StyledGridContainer container item xs={12} md={12} spacing={0}>
        <CustomColumnGrid>
          <h3>{roundNumber}</h3>
        </CustomColumnGrid>
        {game?.players.map((player) => (
          <CustomColumnGrid
            key={`${player.playerIndex}round${roundNumber}`}
            isMiddleGrid
            game={game}
          >
            <StyledTextFieldContainer>
              <Controller
                render={({ field, fieldState }) => (
                  <>
                    <StyledTextField
                      {...field}
                      placeholder="0"
                      key={`${player.playerIndex}round${roundNumber}`}
                      size="small"
                      disabled={isTextFieldDisabled ?? player.score >= game.finalScore}
                      onChange={field.onChange}
                      value={field.value ?? ''}
                      type="text"
                      dir={direction}
                    />
                    {fieldState.error && (
                      <StyledErrorContainer>
                        <Typography variant="caption" color="error">
                          {fieldState.error.message}
                        </Typography>
                      </StyledErrorContainer>
                    )}
                  </>
                )}
                name={`${player.name}round${roundNumber}`}
                control={control}
                // rules={{
                //   required: 'Le score est obligatoire',
                //   pattern: { value: /^[0-9]+$/, message: 'Veuillez saisir un score valide' },
                //   validate: (value) =>
                //     value <= 0 || value > 1000 ? 'Le score doit être entre 0 et 1000' : true,
                // }}
              />
            </StyledTextFieldContainer>
          </CustomColumnGrid>
        ))}
        <CustomColumnGrid>
          <Grid>
            <StyledCustomButton disabled={isButtonAddDisabled} onClick={handleSubmit}>
              <StyledDoneIcon iconColor={addButtonIconColor} iconWidth={addRowButtonWidth} />
            </StyledCustomButton>
            {!isButtonRemoveDisabled && (
              <StyledCustomButton
                onClick={() => handleRemoveScoreRow(roundNumber)}
                disabled={isButtonRemoveDisabled}
              >
                <StyledDeleteIcon iconColor={colors.WHITE} />
              </StyledCustomButton>
            )}
          </Grid>
        </CustomColumnGrid>
      </StyledGridContainer>
    </StyledRoundsScoreContainer>
  );
};

export default RoundRow;

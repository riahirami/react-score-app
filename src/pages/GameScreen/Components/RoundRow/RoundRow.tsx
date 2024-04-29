import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Grid, Typography } from '@mui/material';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Game, Player } from 'types/interfaces/game';
import {
  StyledCustomButton,
  StyledGridContainer,
  StyledRoundsScoreContainer,
  StyledTextField,
  StyledTextFieldContainer,
} from './roundRow.style';
import { colors } from 'utils/colors';
interface RoundRowProps {
  roundNumber: number;
  game: Game;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleAddNewScoreRow: (data: FieldValues) => void;
  handleRemoveScoreRow: (rowNumber: number) => void;
  isValid: boolean;
  checkIfPlayerWin: (player: Player) => boolean;
  isButtonAddDisabled: boolean;
  isButtonRemoveDisabled: boolean;
  isTextFieldDisabled: boolean;
  handleSubmit: (
    callback: (data: FieldValues) => void,
  ) => (event?: React.BaseSyntheticEvent) => void;
  setValue: (
    name: string,
    value: FieldValues | string,
    options?: { shouldValidate?: boolean },
  ) => void;
  pendingRound: boolean;
}
const RoundRow = ({
  roundNumber,
  game,
  register,
  setValue,
  errors,
  handleSubmit,
  handleAddNewScoreRow,
  handleRemoveScoreRow,
  isValid,
  isButtonAddDisabled,
  isButtonRemoveDisabled,
  isTextFieldDisabled,
  pendingRound,
}: RoundRowProps) => {
  const addRowButtonWidth = isButtonRemoveDisabled ? 75 : 20;
  const addButtonIconColor =
    !isValid || game.rounds.length >= roundNumber ? colors.GREY : colors.WHITE;

  return (
    <StyledRoundsScoreContainer pendingRound={pendingRound}>
      <StyledGridContainer container item xs={12} md={12} spacing={0}>
        <CustomColumnGrid>
          <h3>{roundNumber}</h3>
        </CustomColumnGrid>
        {game.players.map((player, index) => (
          <CustomColumnGrid key={index} isMiddleGrid>
            <StyledTextFieldContainer key={`player${index}`}>
              <StyledTextField
                placeholder="0"
                id={`player${index}`}
                key={index}
                {...register(`${player.name}round${roundNumber}`, {
                  required: 'This number is required .',
                  pattern: { value: /^[0-9]*$/, message: 'Please enter a valid number' },
                })}
                defaultValue={0}
                size="small"
                onFocus={() => setValue(`${player.name}round${roundNumber}`, '')}
                disabled={isTextFieldDisabled}
              />
              {errors && errors[`${player.name}round${roundNumber}`]?.message && (
                <Typography variant="subtitle2" color="error" textAlign={'center'}>
                  {String(errors[`${player.name}round${roundNumber}`]?.message)}
                </Typography>
              )}
            </StyledTextFieldContainer>
          </CustomColumnGrid>
        ))}
        <CustomColumnGrid>
          <Grid>
            <StyledCustomButton
              disabled={isButtonAddDisabled}
              onClick={handleSubmit((data) => {
                handleAddNewScoreRow(data);
              })}
            >
              <DoneOutlineIcon
                sx={{
                  color: addButtonIconColor,
                  width: addRowButtonWidth,
                }}
              />
            </StyledCustomButton>
            {!isButtonRemoveDisabled && (
              <StyledCustomButton
                onClick={() => handleRemoveScoreRow(roundNumber)}
                disabled={isButtonRemoveDisabled}
              >
                <DeleteForeverOutlinedIcon
                  sx={{
                    color: colors.WHITE,
                  }}
                />
              </StyledCustomButton>
            )}
          </Grid>
        </CustomColumnGrid>
      </StyledGridContainer>
    </StyledRoundsScoreContainer>
  );
};

export default RoundRow;

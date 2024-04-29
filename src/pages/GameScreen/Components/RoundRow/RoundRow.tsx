import React from 'react';
import { Grid, Typography } from '@mui/material';
import {
  StyledRoundsScoreContainer,
  StyledTextFieldContainer,
  StyledTextField,
  StyledCustomButton,
  StyledGridContainer,
} from './roundRow.style';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import { Game, Player } from 'types/interfaces/game';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { GameAttributes } from 'types/models/Game/Games';

interface RoundRowProps {
  roundNumber: number;
  game: Game;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  handleAddNewRowScore: (data: FieldValues) => void;
  isValid: boolean;
  checkIfPlayerWin: (player: Player) => boolean;
  isButtonDisabled: boolean;
  isTextFieldDisabled: boolean;
  handleSubmit: (
    callback: (data: FieldValues) => void,
  ) => (event?: React.BaseSyntheticEvent) => void;
  setValue: (
    name: string,
    value: FieldValues | string,
    options?: { shouldValidate?: boolean },
  ) => void;
}
const RoundRow = ({
  roundNumber,
  game,
  register,
  setValue,
  errors,
  handleSubmit,
  handleAddNewRowScore,
  isValid,
  isButtonDisabled,
  isTextFieldDisabled,
}: RoundRowProps) => {
  return (
    <StyledRoundsScoreContainer>
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
          <StyledCustomButton
            disabled={isButtonDisabled}
            onClick={handleSubmit((data) => {
              handleAddNewRowScore(data);
            })}
          >
            <DoneOutlineIcon
              sx={{
                color: !isValid || game.rounds.length >= roundNumber ? 'grey' : 'white',
              }}
            />
          </StyledCustomButton>
        </CustomColumnGrid>
      </StyledGridContainer>
    </StyledRoundsScoreContainer>
  );
};

export default RoundRow;

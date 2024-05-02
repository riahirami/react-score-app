import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { FormHelperText, Grid, Typography } from '@mui/material';
import CustomColumnGrid from 'components/CustomColumnGrid/CustomColumnGrid';
import React from 'react';
import {
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useFormContext,
  FormProvider,
  SubmitHandler,
  Form,
} from 'react-hook-form';
import { Game, Player } from 'types/interfaces/game';
import {
  StyledCustomButton,
  StyledErrorContainer,
  StyledGridContainer,
  StyledRoundsScoreContainer,
  StyledTextField,
  StyledTextFieldContainer,
} from './roundRow.style';
import { colors } from 'utils/colors';
import { isPositiveNumber, isScore } from 'utils/validators/input.validators';
import CustomAlertPopover from 'components/CustomAlertPopover/CustomAlertPopover';
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
    !isValid || game.rounds.length >= roundNumber ? colors.GREY : colors.WHITE;

  const { control } = useFormContext();
  const { direction } = useDesignDirection();

  return (
    <StyledRoundsScoreContainer pendingRound={pendingRound} customDirection={direction}>
      <StyledGridContainer container item xs={12} md={12} spacing={0}>
        <CustomColumnGrid>
          <h3>{roundNumber}</h3>
        </CustomColumnGrid>
        {game.players.map((player, index) => (
          <CustomColumnGrid key={`${player.name}round${roundNumber}`} isMiddleGrid>
            <StyledTextFieldContainer>
              <Controller
                render={({ field, fieldState }) => (
                  <>
                    <StyledTextField
                      placeholder="0"
                      id={`${player.name}round${roundNumber}`}
                      size="small"
                      disabled={isTextFieldDisabled}
                      {...field}
                      value={field.value}
                      type="text"
                      label="score"
                    />
                    {/* <FormHelperText>
                      <CustomAlertPopover
                        isShow={!!fieldState.error}
                        text="Veuillez saisir un score positif"
                        alertType="info"
                        alertColor="warning"
                      />
                    </FormHelperText> */}
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
                defaultValue={0}
                rules={{
                  required: 'Le score est obligatoire',
                  pattern: { value: /^[0-9]*$/, message: 'Veuillez saisir un score valide' },
                }}
              />
            </StyledTextFieldContainer>
          </CustomColumnGrid>
        ))}
        <CustomColumnGrid>
          <Grid>
            <StyledCustomButton disabled={isButtonAddDisabled} onClick={handleSubmit}>
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

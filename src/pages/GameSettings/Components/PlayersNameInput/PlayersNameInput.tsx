import { Grid, TextField, Typography } from '@mui/material';
import { StyledFormContainer } from './playersNameInput.styles';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { GameAttributes } from 'types/models/Game/Games';

interface PlayersNameInputProps {
  isTeamModeActivated: boolean;
  playersNumberValue: number;
  register: UseFormRegister<GameAttributes>;
  errors: FieldErrors<GameAttributes>;
}
const PlayersNameInput = ({
  isTeamModeActivated,
  playersNumberValue,
  register,
  errors,
}: PlayersNameInputProps) => {
  const renderPlayersNameInput = (playersNumber: number) => {
    const playersNameInput = [];
    const numberOfPlayers = isTeamModeActivated ? playersNumber / 2 : playersNumber;
    for (let i = 0; i < numberOfPlayers; i++) {
      playersNameInput.push(
        <Grid>
          <StyledFormContainer>
            <h3>{`Player${i + 1}:`}</h3>
            <TextField
              key={`Player${i + 1}:`}
              {...register(`playersName.${i}`, {
                required: true,
                pattern: /^[A-Za-z0-9\s]+$/i,
                minLength: {
                  value: 2,
                  message: 'Le nom du joueur doit contenir au moins 2 caractères',
                },
              })}
              id={`player${i + 1}`}
              variant="outlined"
              placeholder={`Player${i + 1}`}
            />
          </StyledFormContainer>
          {errors && errors.playersName && errors.playersName[i] && (
            <Typography variant="subtitle2" color="error">
              {errors.playersName?.[i]?.message}
            </Typography>
          )}
        </Grid>,
      );
    }
    return playersNameInput;
  };

  return <Grid>{renderPlayersNameInput(playersNumberValue)}</Grid>;
};

export default PlayersNameInput;

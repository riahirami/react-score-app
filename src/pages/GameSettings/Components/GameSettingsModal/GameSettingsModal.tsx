/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  setFinalScore,
  setGameStarted,
  setGameType,
  setPlayers,
  setPlayersNumber,
  toggleGameTeamMode,
} from '../../../../redux/features/gameSlice/gameSlice';
import {
  StyledForm,
  StyledFormContainer,
  StyledFormInnerContainer,
} from './gameSettingsModal.styles';
import { GameAttributes } from 'types/models/Game/Games';
import { useAppDispatch } from 'redux/hooks';
import CustomModal from 'components/CustomModal/CustomModal';
import { GamePlayerNumberEnum, GameTypeEnum } from 'utils/enum';
import { colors } from 'utils/colors';
import { red } from '@mui/material/colors';
import useGameActions from 'hooks/useGameActions';

const GameSettingsModal = () => {
  const [playersNumberValue, setPlayersNumberValue] = useState(2);
  const [isTeamModeActivated, setIsTeamModeActivated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<GameAttributes>({
    mode: 'onChange',
    defaultValues: {
      playersNumber: GamePlayerNumberEnum.TWO,
      gameType: GameTypeEnum.RAMI,
      finalScore: 501,
      playersName: ['p1', 'p2'],
      team: false,
    },
  });

  const renderPlayersNameInput = (playersNumber: number) => {
    const playersNameInput = [];
    const numberOfPlayers = isTeamModeActivated ? playersNumber / 2 : playersNumber;
    for (let i = 0; i < numberOfPlayers; i++) {
      playersNameInput.push(
        <>
          <StyledFormContainer>
            <h4>{`Player${i + 1}`}</h4>
            <TextField
              {...register(`playersName.${i}`, {
                required: true,
                pattern: /^[A-Za-z0-9]+$/i,
                minLength: {
                  value: 2,
                  message: 'Le nom du joueur doit contenir au moins 2 caractères',
                },
              })}
              key={i}
              id={`player${i + 1}`}
              label={`player${i + 1}`}
              variant="outlined"
              placeholder={`Player${i + 1}`}
            />
          </StyledFormContainer>
          {errors && errors.playersName && errors.playersName[i] && (
            <Typography variant="subtitle2" color="error">
              {errors.playersName?.[i]?.message}
            </Typography>
          )}
        </>,
      );
    }
    return playersNameInput;
  };
  const dispatch = useAppDispatch();

  const createGameAction = (data: GameAttributes) => {
    dispatch(setGameType(data.gameType));
    data.team && dispatch(toggleGameTeamMode(data.team));
    dispatch(setGameStarted());
    if (data.playersName) {
      dispatch(setPlayers(data.playersName.filter((item) => item.length > 0)));
      isTeamModeActivated
        ? dispatch(setPlayersNumber(data.playersNumber / 2))
        : dispatch(setPlayersNumber(data.playersNumber));
    }
    data.finalScore && dispatch(setFinalScore(data?.finalScore));
  };

  const handlePlayersNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== GamePlayerNumberEnum.FOUR.toString()) {
      setIsTeamModeActivated(false);
    }
    setPlayersNumberValue(parseInt(event.target.value));
  };

  const handleTeamModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTeamModeActivated(event.target.checked);
  };

  return (
    <CustomModal
      title={'Nouvelle partie'}
      confirmAction={handleSubmit((data) => {
        createGameAction(data);
      })}
      isConfirmButtonDisabled={!isValid}
    >
      <Grid>
        <StyledForm>
          <FormControl>
            <StyledFormInnerContainer>
              <Grid>
                <FormLabel id="players-number-radio-buttons-group-label">
                  Nombre des joueurs
                </FormLabel>

                <RadioGroup
                  aria-labelledby="players-number-radio-buttons-group-label"
                  defaultValue="2"
                  id="playersNumber"
                  onChange={(value) => {
                    handlePlayersNumberChange(value);
                  }}
                >
                  <Grid>
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="2"
                      {...register('playersNumber')}
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="3"
                      {...register('playersNumber')}
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="4"
                      {...register('playersNumber')}
                    />
                  </Grid>
                </RadioGroup>

                {playersNumberValue === GamePlayerNumberEnum.FOUR && (
                  <FormGroup id="handleTeamModeChange">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Individuel</Typography>

                      <FormControlLabel
                        {...register('team')}
                        control={
                          <Switch
                            onChange={(event) => {
                              handleTeamModeChange(event);
                            }}
                          />
                        }
                        label=""
                      />
                      <Typography>Equipe</Typography>
                    </Stack>
                  </FormGroup>
                )}
                <FormLabel id="game-type-radio-buttons-group-label">Type du jeux</FormLabel>
                <RadioGroup
                  aria-labelledby="game-type-radio-buttons-group-label"
                  defaultValue={GameTypeEnum.RAMI}
                  id="gameType"
                >
                  <Grid style={{ display: 'flex' }}>
                    <FormControlLabel
                      value={GameTypeEnum.RAMI}
                      control={<Radio />}
                      label={GameTypeEnum.RAMI}
                      {...register('gameType')}
                    />
                    <FormControlLabel
                      value={GameTypeEnum.CHKOBBA}
                      control={<Radio />}
                      label={GameTypeEnum.CHKOBBA}
                      {...register('gameType')}
                    />
                  </Grid>
                </RadioGroup>
                <FormLabel id="game-type-radio-buttons-group-label">Score à atteindre </FormLabel>
                <TextField
                  id="final-score"
                  variant="outlined"
                  type="text"
                  {...register('finalScore', {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Please enter a valid number',
                    },
                  })}
                />
                {errors && errors.finalScore && (
                  <Typography variant="subtitle2" color="error">
                    {errors?.finalScore?.message}
                  </Typography>
                )}
              </Grid>
              <Grid>{renderPlayersNameInput(playersNumberValue)}</Grid>
            </StyledFormInnerContainer>
          </FormControl>
        </StyledForm>
      </Grid>
    </CustomModal>
  );
};
export default GameSettingsModal;

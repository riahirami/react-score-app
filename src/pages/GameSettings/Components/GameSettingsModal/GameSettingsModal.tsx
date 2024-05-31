import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import useFirebaseActions from 'hooks/useFirebaseActions';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  setFinalScore,
  setGameStarted,
  setGameType,
  setPlayers,
  setPlayersNumber,
  toggleGameTeamMode,
} from 'redux/features/gameSlice/gameSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { GameAttributes } from 'types/models/Game/Games';
import {
  GAME_NUMBER_OF_DEFAULT_PLAYER,
  GAME_TYPE_RADIO_OPTIONS,
  PLAYERS_NUMBER_RADIO_OPTIONS,
} from 'utils/constants';
import { GamePlayerNumberEnum, GameTypeEnum, ModalTypeEnum } from 'utils/enum';
import PlayersNameInput from '../PlayersNameInput/PlayersNameInput';
import RadioGroupWithLabels from '../RadioGroupWithLabels/RadioGroupWithLabels';
import { StyledForm, StyledFormInnerContainer } from './gameSettingsModal.styles';
import { translate } from 'locales/i18n';
import { setModal } from 'redux/features/modalSlice/modalSlice';

// eslint-disable-next-line sonarjs/cognitive-complexity
const GameSettingsModal = () => {
  const { createGameOnFb } = useFirebaseActions();
  const isGameStarted = useAppSelector((state) => state.game.isGameStarted);
  const [playersNumberValue, setPlayersNumberValue] = useState(
    Number(GAME_NUMBER_OF_DEFAULT_PLAYER),
  );
  const [isTeamModeActivated, setIsTeamModeActivated] = useState(false);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { isValid, errors },
    trigger,
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

  const dispatch = useAppDispatch();

  const createGameAction = (data: GameAttributes) => {
    createGameOnFb(data);

    const playersNumber = isTeamModeActivated ? data.playersNumber / 2 : data.playersNumber;
    dispatch(setGameType(data.gameType));
    if (data.team) {
      dispatch(toggleGameTeamMode(data.team));
    }
    dispatch(setGameStarted(true));
    if (data.playersName) {
      dispatch(setPlayers(data.playersName.filter((item) => item.length > 0)));
      dispatch(setPlayersNumber(playersNumber));
    }
    if (data.finalScore) {
      dispatch(setFinalScore(data.finalScore));
    }
    // if (gameId) {
    //   dispatch(setGameCreatedBy(gameId));
    // }
  };

  const handlePlayersNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== GamePlayerNumberEnum.FOUR.toString()) {
      setIsTeamModeActivated(false);
    }
    setPlayersNumberValue(parseInt(event.target.value));
    for (let i = parseInt(event.target.value); i <= GamePlayerNumberEnum.FOUR; i++) {
      unregister(`playersName.${i}`);
    }
  };

  const handleTeamModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    trigger('team');
    setIsTeamModeActivated(event.target.checked);
    if (event.target.checked) {
      unregister('playersName.2');
      unregister('playersName.3');
    }
  };

  useEffect(() => {
    dispatch(
      setModal({
        content: ModalTypeEnum.GAME_SETTINGS,
        title: translate('Game_Actions.New_Game'),
        hasConfirmButton: true,
        confirmAction: handleSubmit((data) => {
          createGameAction(data);
        }),
        isConfirmButtonDisabled: !isValid,
        cancelText: translate('Modal.Common.Cancel'),
        confirmText: translate('Modal.Common.Confirm'),
      }),
    );
  }, []);
  return !isGameStarted ? (
    <StyledForm>
      <FormControl>
        <StyledFormInnerContainer>
          <Grid>
            <RadioGroupWithLabels
              options={PLAYERS_NUMBER_RADIO_OPTIONS}
              name="playersNumber"
              register={register}
              defaultValue={GAME_NUMBER_OF_DEFAULT_PLAYER}
              onChange={(value) => {
                handlePlayersNumberChange(value);
              }}
              label={translate('Game_Settings.Player_number')}
            />

            {playersNumberValue === GamePlayerNumberEnum.FOUR && (
              <FormGroup id="handleTeamModeChange">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>{translate('Game_Settings.Game_Mode.Single')}</Typography>

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
                  <Typography>{translate('Game_Settings.Game_Mode.Team')}</Typography>
                </Stack>
              </FormGroup>
            )}
            <RadioGroupWithLabels
              options={GAME_TYPE_RADIO_OPTIONS}
              name="gameType"
              register={register}
              defaultValue={GameTypeEnum.RAMI}
              label={translate('Game_Settings.Game_type')}
            />
            <FormLabel id="game-type-radio-buttons-group-label">
              {translate('Game_Settings.Final_score')}
            </FormLabel>
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
          <Grid>
            <PlayersNameInput
              isTeamModeActivated={isTeamModeActivated}
              playersNumberValue={playersNumberValue}
              register={register}
              errors={errors}
            />
          </Grid>
        </StyledFormInnerContainer>
      </FormControl>
    </StyledForm>
  ) : (
    <></>
  );
};
export default GameSettingsModal;

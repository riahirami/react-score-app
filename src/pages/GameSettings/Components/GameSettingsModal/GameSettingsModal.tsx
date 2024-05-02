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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  setFinalScore,
  setGameStarted,
  setGameType,
  setPlayers,
  setPlayersNumber,
  toggleGameTeamMode,
} from 'redux/features/gameSlice/gameSlice';
import { StyledForm, StyledFormInnerContainer } from './gameSettingsModal.styles';
import { GameAttributes } from 'types/models/Game/Games';
import { useAppDispatch } from 'redux/hooks';
import CustomModal from 'components/CustomModal/CustomModal';
import { GamePlayerNumberEnum, GameTypeEnum } from 'utils/enum';
import PlayersNameInput from '../PlayersNameInput/PlayersNameInput';
import RadioGroupWithLabels from '../RadioGroupWithLabels/RadioGroupWithLabels';
import {
  GAME_NUMBER_OF_DEFAULT_PLAYER,
  GAME_TYPE_RADIO_OPTIONS,
  PLAYERS_NUMBER_RADIO_OPTIONS,
} from 'utils/constants';
import { useTranslation } from 'react-i18next';

const GameSettingsModal = () => {
  const { t } = useTranslation();
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
    dispatch(setGameType(data.gameType));
    if (data.team) {
      dispatch(toggleGameTeamMode(data.team));
    }
    dispatch(setGameStarted());
    if (data.playersName) {
      dispatch(setPlayers(data.playersName.filter((item) => item.length > 0)));
      isTeamModeActivated
        ? dispatch(setPlayersNumber(data.playersNumber / 2))
        : dispatch(setPlayersNumber(data.playersNumber));
    }
    if (data.finalScore) {
      dispatch(setFinalScore(data.finalScore));
    }
  };

  const handlePlayersNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== GamePlayerNumberEnum.FOUR.toString()) {
      setIsTeamModeActivated(false);
    }
    setPlayersNumberValue(parseInt(event.target.value));
  };

  const handleTeamModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    trigger('team');
    setIsTeamModeActivated(event.target.checked);
    if (event.target.checked) {
      unregister('playersName.2');
      unregister('playersName.3');
    }
  };

  return (
    <CustomModal
      title={t('Game_Actions.New_Game')}
      confirmAction={handleSubmit((data) => {
        createGameAction(data);
      })}
      isConfirmButtonDisabled={!isValid}
      cancelText={t('Modal.Common.Cancel')}
      confirmText={t('Modal.Common.Confirm')}
    >
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
                label={t('Game_Settings.Player_number')}
              />

              {playersNumberValue === GamePlayerNumberEnum.FOUR && (
                <FormGroup id="handleTeamModeChange">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>{t('Game_Settings.Game_Mode.Single')}</Typography>

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
                    <Typography>{t('Game_Settings.Game_Mode.Team')}</Typography>
                  </Stack>
                </FormGroup>
              )}
              <RadioGroupWithLabels
                options={GAME_TYPE_RADIO_OPTIONS}
                name="gameType"
                register={register}
                defaultValue={GameTypeEnum.RAMI}
                label={t('Game_Settings.Game_type')}
              />
              <FormLabel id="game-type-radio-buttons-group-label">
                {t('Game_Settings.Final_score')}
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
    </CustomModal>
  );
};
export default GameSettingsModal;

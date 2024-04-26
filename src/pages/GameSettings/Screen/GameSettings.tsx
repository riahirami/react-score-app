import { Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import GameScreen from '../../GameScreen/GameScreen';
import GameSettingsModal from '../Components/GameSettingsModal/GameSettingsModal';
import GameStartSection from '../Components/GameStartSection/GameStartSection';
import { GameAttributes } from 'types/models/Game/Games';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { openModal } from 'redux/features/modalSlice/modalSlice';
import { useEffect } from 'react';
import { persistData } from 'utils/helpers/storage.helpers';
import { ThemeEnum } from 'utils/enum';

const GameSettings = () => {
  const { reset } = useForm<GameAttributes>();
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const isGameStarted = useAppSelector((state) => state.game.isGameStarted);

  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(openModal());
    reset();
  };

  useEffect(() => {
    persistData('theme', ThemeEnum.LIGHT);
  }, []);

  return (
    <Grid>
      {!isGameStarted ? <GameStartSection handleOpen={handleOpen} /> : <GameScreen />}
      {isModalOpen && !isGameStarted && <GameSettingsModal />}
    </Grid>
  );
};

export default GameSettings;

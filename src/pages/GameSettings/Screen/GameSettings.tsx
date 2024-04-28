import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { openModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { GameAttributes } from 'types/models/Game/Games';
import { ThemeEnum } from 'utils/enum';
import { persistData } from 'utils/helpers/storage.helpers';
import GameScreen from '../../GameScreen/Screen/GameScreen';
import GameSettingsModal from '../Components/GameSettingsModal/GameSettingsModal';
import GameStartSection from '../Components/GameStartSection/GameStartSection';
import { StyledContainer } from './GameSettings.styles';

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
    <StyledContainer>
      {!isGameStarted ? <GameStartSection handleOpen={handleOpen} /> : <GameScreen />}
      {isModalOpen && !isGameStarted && <GameSettingsModal />}
    </StyledContainer>
  );
};

export default GameSettings;

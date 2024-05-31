import { DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import useDesignDirection from 'hooks/useDesignDirection';
import React from 'react';
import { closeModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CustomModalStyle, StyledExitModalButtonContainer } from './CustomModal.style';
import { translate } from 'locales/i18n';
import CustomTransition from 'components/CustomTransition/CustomTransition';
import { ModalTypeEnum } from 'utils/enum';
import CustomModalContent from 'pages/GameSettings/Components/CustomModalContent/CustomModalContent';
import GameOverModal from 'pages/GameSettings/Components/GameOverModal/GameOverModal';
import GameCode from 'pages/GameScreen/Components/GameCode/GameCode';
import GameSettingsModal from 'pages/GameSettings/Components/GameSettingsModal/GameSettingsModal';
import JoinGameModal from 'pages/GameSettings/Components/JoinGameModal/JoinGameModal';

interface CustomModalProps {
  title: string;
  isConfirmButtonDisabled?: boolean;
  confirmAction?: () => void;
  cancelText?: string;
  confirmText?: string;
  hasCancelButton?: boolean;
  hasConfirmButton?: boolean;
  type: ModalTypeEnum;
  data?: unknown;
}

const CustomModal = ({
  title,
  confirmAction,
  isConfirmButtonDisabled,
  cancelText,
  confirmText,
  hasCancelButton = true,
  hasConfirmButton = true,
  data,
}: CustomModalProps) => {
  const { isOpen, modal } = useAppSelector((state) => state.modal);
  const { gameCode } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();
  const { direction } = useDesignDirection();

  const handleClose = (): void => {
    dispatch(closeModal());
  };

  const handleConfirm = (): void => {
    if (confirmAction) {
      confirmAction();
    }
    handleClose();
  };

  const getModalContent = () => {
    switch (modal.content) {
      case ModalTypeEnum.EXIT_GAME:
        return <DialogContentText>{translate('Modal.Exit.content')}</DialogContentText>;
      case ModalTypeEnum.UNAUTHORIZED:
        return <CustomModalContent contentText={translate('Modal.Unauthorized.content')} />;
      case ModalTypeEnum.JOIN_GAME:
        return <JoinGameModal formMethods={data} />;
      case ModalTypeEnum.RESUME_GAME:
        return <JoinGameModal formMethods={data} />;
      case ModalTypeEnum.GAME_OVER:
        return <CustomModalContent contentText={translate('Modal.Game_Over.content')} />;
      case ModalTypeEnum.Game_CODE:
        return (
          <GameCode description={translate('Modal.Share_Code.Description')} gameCode={gameCode} />
        );
      case ModalTypeEnum.GAME_SETTINGS:
        return <GameSettingsModal />;
      default:
        return <></>;
    }
  };

  return (
    <CustomModalStyle
      open={isOpen}
      onClose={handleClose}
      fullWidth
      customDirection={direction}
      TransitionComponent={CustomTransition}
    >
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>{getModalContent()}</DialogContent>
      <Divider />
      <StyledExitModalButtonContainer>
        {hasCancelButton && (
          <Button
            onClick={handleClose}
            variant="contained"
            color={'error'}
            sx={{ textTransform: 'capitalize' }}
          >
            {cancelText ?? translate('Modal.Common.Cancel')}
          </Button>
        )}
        {hasConfirmButton && (
          <Button
            onClick={handleConfirm}
            variant="contained"
            disabled={isConfirmButtonDisabled}
            sx={{ textTransform: 'capitalize' }}
          >
            {confirmText ?? translate('Modal.Common.Confirm')}
          </Button>
        )}
      </StyledExitModalButtonContainer>
    </CustomModalStyle>
  );
};

export default CustomModal;

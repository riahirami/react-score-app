/* eslint-disable sonarjs/no-duplicate-string */
import { RouteIdEnum } from 'config/enums';
import { translate } from 'locales/i18n';
import { useState } from 'react';
import {
  ModalContent,
  closeModal,
  openModal,
  setModal,
} from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ModalTypeEnum } from 'utils/enum';

interface modalObject {
  type: ModalTypeEnum;
  title: string;
  confirmText: string;
  confirmAction?: () => void;
  hasConfirmButton: boolean;
  hasCancelButton: boolean;
  cancelText: string;
}
interface useModalProps {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  modalContent: ModalContent;
  handleModalAction: (modalObject: modalObject) => void;
  modalType?: ModalTypeEnum;
  handleNewGameAction: (confirmAction: (route: RouteIdEnum) => void) => void;
  handleAuthorizedAction: () => void;
  handleGameOver: () => void;
  handleJoinGameAction: (confirmFunction: (resume: boolean) => void) => void;
  handleResumeGameAction: (confirmFunction: (resume: boolean) => void) => void;
  handleModalTitle: () => string;
  handleInexistentGame: () => void;
}

const useModal = (): useModalProps => {
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const modalContent = useAppSelector((state) => state.modal.modal);
  const [modalType, setModalType] = useState<ModalTypeEnum | undefined>(undefined);

  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleModalAction = (modalObject: modalObject) => {
    setModalType(modalObject.type);
    dispatch(
      setModal({
        content: modalObject.type,
        title: modalObject.title,
        hasConfirmButton: modalObject.hasConfirmButton,
        confirmText: modalObject.confirmText,
        confirmAction: modalObject.confirmAction,
        hasCancelButton: modalObject.hasCancelButton,
        cancelText: modalObject.cancelText,
      }),
    );
    dispatch(openModal());
  };

  const handleNewGameAction = (confirmAction: (route: RouteIdEnum) => void) => {
    handleModalAction({
      type: ModalTypeEnum.GAME_SETTINGS,
      title: translate('Modal.Game_Settings.title'),
      confirmText: translate('Modal.Game_Settings.Start_Game'),
      confirmAction: () => {
        confirmAction(RouteIdEnum.GameScreen);
      },
      hasConfirmButton: true,
      hasCancelButton: true,
      cancelText: translate('Modal.Common.Cancel'),
    });
  };
  const handleAuthorizedAction = () => {
    handleModalAction({
      type: ModalTypeEnum.UNAUTHORIZED,
      title: translate('Modal.Unauthorized.title'),
      confirmText: translate('Modal.Common.Ok'),
      hasConfirmButton: false,
      hasCancelButton: true,
      cancelText: translate('Modal.Common.Ok'),
    });
  };

  const handleGameOver = () => {
    handleModalAction({
      type: ModalTypeEnum.GAME_OVER,
      title: translate('Modal.Game_Over.title'),
      confirmText: translate('Modal.Common.Ok'),
      hasConfirmButton: true,
      hasCancelButton: false,
      cancelText: translate('Modal.Common.Cancel'),
    });
  };
  const handleInexistentGame = () => {
    handleModalAction({
      type: ModalTypeEnum.GAME_NOT_FOUND,
      title: translate('Modal.Game_not_Found.title'),
      confirmText: translate('Modal.Common.Ok'),
      hasConfirmButton: true,
      hasCancelButton: false,
      cancelText: translate('Modal.Common.Cancel'),
    });
  };

  const handleJoinGameAction = (confirmFunction: (resume: boolean) => void) => {
    handleModalAction({
      type: ModalTypeEnum.JOIN_GAME,
      title: translate('Modal.Join_Game.title'),
      confirmText: translate('Modal.Common.Confirm'),
      confirmAction: () => {
        confirmFunction(false);
      },
      hasConfirmButton: true,
      hasCancelButton: true,
      cancelText: translate('Modal.Common.Cancel'),
    });
  };

  const handleResumeGameAction = (confirmFunction: (resume: boolean) => void) => {
    handleModalAction({
      type: ModalTypeEnum.RESUME_GAME,
      title: translate('Modal.Resume_Game.title'),
      confirmText: translate('Modal.Common.Confirm'),
      confirmAction: () => {
        confirmFunction(true);
      },
      hasConfirmButton: true,
      hasCancelButton: true,
      cancelText: translate('Modal.Common.Cancel'),
    });
  };

  const handleModalTitle = () => {
    switch (modalType) {
      case ModalTypeEnum.EXIT_GAME:
        return translate('Modal.Exit.title');
      case ModalTypeEnum.UNAUTHORIZED:
        return translate('Modal.Unauthorized.title');
      case ModalTypeEnum.JOIN_GAME:
        return translate('Game_Actions.Code');
      case ModalTypeEnum.RESUME_GAME:
        return translate('Modal.Resume_Game.title');
      case ModalTypeEnum.GAME_OVER:
        return translate('Modal.Game_Over.title');
      case ModalTypeEnum.GAME_SETTINGS:
        return translate('Game_Actions.New_Game');
      case ModalTypeEnum.Game_CODE:
        return translate('New_Game.Join_Game');
      case ModalTypeEnum.GAME_NOT_FOUND:
        return translate('Modal.Game_not_Found.title');
      default:
        return '';
    }
  };

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    modalContent,
    handleModalAction,
    modalType,
    handleNewGameAction,
    handleAuthorizedAction,
    handleGameOver,
    handleJoinGameAction,
    handleResumeGameAction,
    handleModalTitle,
    handleInexistentGame,
  };
};

export default useModal;

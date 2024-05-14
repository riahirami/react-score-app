import { DialogTitle, Slide, Zoom } from '@mui/material';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import useDesignDirection from 'hooks/useDesignDirection';
import React from 'react';
import { closeModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { CustomModalStyle, StyledExitModalButtonContainer } from './CustomModal.style';
import { TransitionProps } from '@mui/material/transitions';
import { translate } from 'locales/i18n';
import CustomTransition from 'components/CustomTransition/CustomTransition';

interface CustomModalProps {
  children: React.ReactNode;
  title: string;
  isConfirmButtonDisabled?: boolean;
  confirmAction?: () => void;
  cancelText?: string;
  confirmText?: string;
  hasCancelButton?: boolean;
  hasConfirmButton?: boolean;
}

const CustomModal = ({
  children,
  title,
  confirmAction,
  isConfirmButtonDisabled,
  cancelText,
  confirmText,
  hasCancelButton = true,
  hasConfirmButton = true,
}: CustomModalProps) => {
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
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

  return (
    <CustomModalStyle
      open={isModalOpen}
      onClose={handleClose}
      fullWidth
      customDirection={direction}
      TransitionComponent={CustomTransition}
    >
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
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

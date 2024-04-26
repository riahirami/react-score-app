import { Dialog, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import React from 'react';
import { closeModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

interface CustomModalProps {
  children: React.ReactNode;
  title: string;
  isConfirmButtonDisabled?: boolean;
  confirmAction?: () => void;
  cancelText?: string;
  confirmText?: string;
}

const CustomModal = ({
  children,
  title,
  confirmAction,
  isConfirmButtonDisabled,
  cancelText = 'Annuler',
  confirmText = 'Confirmer',
}: CustomModalProps) => {
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();

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
    <Dialog open={isModalOpen} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          sx={{ textTransform: 'capitalize' }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="info"
          disabled={isConfirmButtonDisabled}
          sx={{ textTransform: 'capitalize' }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;

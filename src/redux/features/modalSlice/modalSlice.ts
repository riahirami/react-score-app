import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalTypeEnum } from 'utils/enum';

export interface ModalContent {
  content: ModalTypeEnum;
  title: string;
  confirmAction?: () => void;
  cancelAction?: () => void;
  confirmText?: string;
  cancelText?: string;
  isConfirmButtonDisabled?: boolean;
  hasConfirmButton?: boolean;
  hasCancelButton?: boolean;
}
export interface ModalState {
  isOpen: boolean;
  modal: ModalContent;
}

const initialState: ModalState = {
  isOpen: false,
  modal: {
    content: ModalTypeEnum.EMPTY,
    title: '',
    confirmAction: undefined,
    cancelAction: undefined,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isConfirmButtonDisabled: false,
    hasConfirmButton: true,
    hasCancelButton: true,
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modal = initialState.modal;
    },
    setModal: (state, action: PayloadAction<ModalContent | undefined>) => {
      if (action.payload) {
        state.modal = action.payload;
      }
    },
  },
});

export const { openModal, closeModal, setModal } = modalSlice.actions;

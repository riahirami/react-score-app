import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setGameStarted } from 'redux/features/gameSlice/gameSlice';
import { openModal, setModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch } from 'redux/hooks';
import { colors } from 'utils/colors';
import { StyledButtonContainer } from './exitButton.Style';
import { translate } from 'locales/i18n';
import { ModalTypeEnum } from 'utils/enum';
import CustomModal from 'components/CustomModal/CustomModal';
import useModal from 'hooks/useModal';

const ExitButton = () => {
  const navigate = useNavigate();
  const { isModalOpen, modalContent } = useModal();
  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(
      setModal({
        content: ModalTypeEnum.EXIT_GAME,
        title: translate('Modal.Exit.title'),
        confirmAction() {
          dispatch(setGameStarted(false));
          navigate('/');
        },
      }),
    );
    dispatch(openModal());
  };

  const modalConfig =
    modalContent?.content === ModalTypeEnum.EXIT_GAME
      ? {
          title: translate('Modal.Exit.title'),
          confirmAction() {
            dispatch(setGameStarted(false));
            navigate('/');
          },
          hasConfirmButton: true,
          hasCancelButton: true,
          type: ModalTypeEnum.EXIT_GAME,
          confirmText: translate('Modal.Common.Yes'),
        }
      : {
          title: translate('Modal.Share_Code.title'),
          hasConfirmButton: false,
          hasCancelButton: true,
          type: ModalTypeEnum.Game_CODE,
          cancelText: translate('Modal.Common.Ok'),
        };

  return (
    <StyledButtonContainer>
      {isModalOpen && (
        <CustomModal
          title={modalConfig?.title}
          confirmAction={modalConfig.confirmAction}
          hasConfirmButton={modalConfig.hasConfirmButton}
          confirmText={modalConfig.confirmText}
          cancelText={modalConfig.cancelText}
          type={modalConfig.type}
        />
      )}
      <Button
        onClick={() => handleExit()}
        variant="contained"
        style={{
          backgroundColor: colors.RED,
        }}
        sx={{ textTransform: 'none' }}
      >
        <LogoutOutlinedIcon /> {translate('Game_Actions.Quit')}
      </Button>
    </StyledButtonContainer>
  );
};

export default ExitButton;

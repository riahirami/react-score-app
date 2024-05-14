import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Button } from '@mui/material';
import CustomModalContent from 'pages/GameSettings/Components/CustomModalContent/CustomModalContent';
import { useNavigate } from 'react-router-dom';
import { setGameStarted } from 'redux/features/gameSlice/gameSlice';
import { openModal, setModal } from 'redux/features/modalSlice/modalSlice';
import { useAppDispatch } from 'redux/hooks';
import { colors } from 'utils/colors';
import { StyledButtonContainer } from './exitButton.Style';
import { translate } from 'locales/i18n';

const ExitButton = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleExit = () => {
    dispatch(
      setModal({
        content: <CustomModalContent contentText={translate('Modal.Exit.content')} />,
        title: translate('Modal.Exit.title'),
        confirmAction() {
          dispatch(setGameStarted(false));
          navigate('/');
        },
      }),
    );
    dispatch(openModal());
  };

  return (
    <StyledButtonContainer>
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

import IosShareIcon from '@mui/icons-material/IosShare';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal, setModal } from 'redux/features/modalSlice/modalSlice';
import GameCode from '../GameCode/GameCode';
import { translate } from 'locales/i18n';

interface ShareGameCodeProps {
  gameCode: string;
}
const ShareGameCode = ({ gameCode }: ShareGameCodeProps) => {
  const dispatch = useDispatch();

  const handleShareGameCode = () => {
    dispatch(
      setModal({
        content: (
          <GameCode description={translate('Modal.Share_Code.Description')} gameCode={gameCode} />
        ),
        title: translate('Modal.Share_Code.title'),
        hasConfirmButton: false,
        hasCancelButton: true,
        cancelText: translate('Modal.Common.Ok'),
      }),
    );
    dispatch(openModal());
  };
  return (
    <Button
      onClick={handleShareGameCode}
      title="Share"
      variant="contained"
      sx={{
        borderRadius: 66,
      }}
    >
      <IosShareIcon />
    </Button>
  );
};

export default ShareGameCode;

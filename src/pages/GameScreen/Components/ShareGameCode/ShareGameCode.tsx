import IosShareIcon from '@mui/icons-material/IosShare';
import { useDispatch } from 'react-redux';
import { openModal, setModal } from 'redux/features/modalSlice/modalSlice';
import { translate } from 'locales/i18n';
import { ModalTypeEnum } from 'utils/enum';
import { StyledShareButton } from './shareGame.Style';

const ShareGameCode = () => {
  const dispatch = useDispatch();
  const handleShareGameCode = () => {
    dispatch(
      setModal({
        title: translate('Modal.Share_Code.title'),
        content: ModalTypeEnum.Game_CODE,
        hasConfirmButton: false,
        hasCancelButton: false,
        cancelText: translate('Modal.Common.Ok'),
      }),
    );
    dispatch(openModal());
  };

  return (
    <StyledShareButton onClick={handleShareGameCode} title="Share" variant="contained">
      <IosShareIcon />
    </StyledShareButton>
  );
};

export default ShareGameCode;

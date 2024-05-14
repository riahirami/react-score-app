import { Typography } from '@mui/material';
import { translate } from 'locales/i18n';

const GameOverModal = () => {
  return <Typography>{translate('Modal.Game_Over.content')}</Typography>;
};

export default GameOverModal;

import { StyledRibbonNext } from './previewModeBadge.style';
import { translate } from 'locales/i18n';

const PreviewModeBadge = () => {
  return <StyledRibbonNext>{translate('Preview_Mode')}</StyledRibbonNext>;
};

export default PreviewModeBadge;

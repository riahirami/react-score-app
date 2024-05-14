import { StyledBadgeContainer } from './previewModeBadge.style';
import { translate } from 'locales/i18n';

const PreviewModeBadge = () => {
  return <StyledBadgeContainer>{translate('Preview_Mode')}</StyledBadgeContainer>;
};

export default PreviewModeBadge;

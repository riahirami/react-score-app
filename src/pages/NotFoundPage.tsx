import { translate } from 'locales/i18n';

const NotFoundPage = () => {
  return <h1 style={{ padding: '10rem' }}> {translate('common.not_found_page_title')}</h1>;
};

export default NotFoundPage;

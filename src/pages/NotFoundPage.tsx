import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return <h1 style={{ padding: '10rem' }}> {t('common.not_found_page_title')}</h1>;
};

export default NotFoundPage;

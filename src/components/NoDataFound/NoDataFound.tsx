import { useTranslation } from 'react-i18next';

const NoDataFound = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '5rem' }}>
      <h1>{t('pokemon.no_data_found_message')}</h1>
    </div>
  );
};

export default NoDataFound;

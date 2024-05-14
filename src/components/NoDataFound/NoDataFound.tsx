import { translate } from 'locales/i18n';

const NoDataFound = () => {
  return (
    <div style={{ padding: '5rem' }}>
      <h1>{translate('pokemon.no_data_found_message')}</h1>
    </div>
  );
};

export default NoDataFound;

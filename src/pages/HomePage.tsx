import { Container, Typography } from '@mui/material';
import { translate } from 'locales/i18n';

function Homepage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        alignItems: 'center',
        padding: '10em',
      }}
    >
      <Typography variant="h2">{translate('common.app_name')}</Typography>
    </Container>
  );
}

export default Homepage;

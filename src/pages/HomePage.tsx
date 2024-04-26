import { Button, Container, Typography } from '@mui/material';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      <Typography variant="h2">{t('common.app_name')}</Typography>
    </Container>
  );
}

export default Homepage;

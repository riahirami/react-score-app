import { Chip, Grid, Stack, Typography } from '@mui/material';
import { env } from 'config/env/dev';
import React from 'react';
import { colors } from 'utils/colors';
import QRCode from 'react-qr-code';
import { StyledDivider } from './gameCode.style';
import { translate } from 'locales/i18n';

interface GameCodeProps {
  description: string;
  gameCode: string | unknown;
}
const GameCode = ({ description, gameCode }: GameCodeProps) => {
  const url = env.url + '/join-game/' + gameCode;
  return (
    <Grid container justifyContent={'center'} alignItems={'center'}>
      <Stack justifyContent={'center'} alignItems={'center'}>
        <Typography variant="h6" color={colors.BLACK}>
          {description}
        </Typography>
        <Typography color={colors.BLACK}>{translate('Modal.Share_Code.byCode')}</Typography>
        <Typography variant="h5" color={colors.BLACK} textAlign={'center'}>
          {' « '} {gameCode as string} {' » '}
        </Typography>
        <StyledDivider>
          <Chip label={translate('Modal.Share_Code.or')} size="small" />
        </StyledDivider>
        <Typography color={colors.BLACK}>{translate('Modal.Share_Code.byLink')}</Typography>
        <Typography>
          <a href={url}>{url}</a>
        </Typography>
        <StyledDivider>
          <Chip label={translate('Modal.Share_Code.or')} size="small" />
        </StyledDivider>
        <Typography color={colors.BLACK}>{translate('Modal.Share_Code.buQrCode')}</Typography>
        <QRCode value={url} size={150} />
      </Stack>
    </Grid>
  );
};

export default GameCode;

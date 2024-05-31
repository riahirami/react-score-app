import { Grid, TextField } from '@mui/material';
import { translate } from 'locales/i18n';
import { Controller, FormProvider } from 'react-hook-form';

interface JoinGameModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formMethods: any;
}
const JoinGameModal = ({ formMethods }: JoinGameModalProps) => {
  return (
    <FormProvider {...formMethods}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            render={({ field }) => (
              <Grid container justifyContent={'center'}>
                <TextField
                  {...field}
                  id="gameCode"
                  label={translate('Game_Actions.Code')}
                  variant="outlined"
                  size="small"
                  value={field.value ?? ''}
                  onChange={field.onChange}
                />
              </Grid>
            )}
            control={formMethods.control}
            name="gameCode"
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default JoinGameModal;

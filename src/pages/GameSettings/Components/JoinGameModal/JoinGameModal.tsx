import { Grid, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { translate } from 'locales/i18n';

export const JoinGameModal = () => {
  const { control } = useFormContext();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              id={'gameCode'}
              fullWidth
              label={translate('Game_Actions.Code')}
              variant="outlined"
              size="small"
              value={field.value}
              onChange={field.onChange}
            />
          )}
          control={control}
          name="gameCode"
        />
      </Grid>
    </Grid>
  );
};

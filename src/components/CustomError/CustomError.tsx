import { Grid, Typography } from '@mui/material';
const CustomError = () => {
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2em',
        alignItems: 'center',
        padding: '5%',
      }}
    >
      <Typography variant="h4" component="h4">
        Oops there was an error
      </Typography>
    </Grid>
  );
};

export default CustomError;

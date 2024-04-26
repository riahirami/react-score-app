import { Grid } from '@mui/material';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Grid container padding={2}>
      {children}
    </Grid>
  );
}

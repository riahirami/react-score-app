import { Grid } from '@mui/material';
import { CustomLoader } from 'components/CustomLoader copy/CustomLoader';
import Overlay from 'components/Overlay/Overlay';
import { SelectLoader } from 'redux/features/loader/loaderSlice';
import { useAppSelector } from 'redux/hooks';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const loader = useAppSelector(SelectLoader);

  return (
    <Grid>
      {loader.isVisible && (
        <>
          <Overlay />
          <CustomLoader />
        </>
      )}
      {children}
    </Grid>
  );
}

import { Grid } from '@mui/material';
import { CustomLoader } from 'components/CustomLoader copy/CustomLoader';
import CustomModal from 'components/CustomModal/CustomModal';
import Overlay from 'components/Overlay/Overlay';
import { SelectLoader } from 'redux/features/loader/loaderSlice';
import { useAppSelector } from 'redux/hooks';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const isModalOpen = useAppSelector((state) => state.modal.isOpen);
  const modalContent = useAppSelector((state) => state.modal.modal);
  const loader = useAppSelector(SelectLoader);

  return (
    <Grid>
      {isModalOpen && modalContent && (
        <CustomModal
          title={modalContent?.title}
          confirmAction={modalContent.confirmAction}
          hasConfirmButton={modalContent.hasConfirmButton}
          hasCancelButton={modalContent.hasCancelButton}
          confirmText={modalContent.confirmText}
          cancelText={modalContent.cancelText}
        >
          {modalContent?.content}
        </CustomModal>
      )}
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

import { useState } from 'react';

interface useModalAlertReturnType {
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAlertOpen: () => void;
  handleAlertClose: () => void;
}

const useModalAlert = (): useModalAlertReturnType => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };
  return { isAlertOpen, setIsAlertOpen, handleAlertOpen, handleAlertClose };
};

export default useModalAlert;

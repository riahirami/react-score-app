import { Typography } from '@mui/material';
import React from 'react';

interface CustomModalContentProps {
  contentText: string;
}

const CustomModalContent = ({ contentText }: CustomModalContentProps) => {
  return <Typography>{contentText}</Typography>;
};

export default CustomModalContent;

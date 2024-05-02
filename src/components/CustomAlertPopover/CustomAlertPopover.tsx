import { Alert, Grid, Popper, Typography } from '@mui/material';
import React, { useState } from 'react';

interface CustomAlertPopoverProps {
  text: string | undefined;
  isShow: boolean;
  alertType?: 'success' | 'error' | 'warning' | 'info';
  alertColor?: 'success' | 'error' | 'warning' | 'info';
}

const CustomAlertPopover = ({ text, isShow, alertType, alertColor }: CustomAlertPopoverProps) => {
  return (
    <Grid
      style={{
        position: 'fixed',
        bottom: 120,
        left: 0,
        zIndex: 999,
        borderRadius: 18,
        marginRight: 10,
        marginLeft: 10,
      }}
    >
      {isShow && (
        <Alert severity={alertType} color={alertColor}>
          {text}
        </Alert>
      )}
    </Grid>
  );
};
export default CustomAlertPopover;

import { Zoom, ZoomProps } from '@mui/material';
import React from 'react';

const CustomTransition = React.forwardRef<HTMLDivElement, ZoomProps>((props) => {
  return (
    <Zoom in={true} timeout={{ enter: 700, exit: 700 }} {...props}>
      {props.children}
    </Zoom>
  );
});

CustomTransition.displayName = 'CustomTransition';

export default CustomTransition;

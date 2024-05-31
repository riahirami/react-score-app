import { Zoom, ZoomProps } from '@mui/material';
import React from 'react';

const CustomTransition = React.forwardRef<HTMLDivElement, ZoomProps>((props, ref) => {
  return (
    <Zoom in={true} timeout={{ enter: 700, exit: 700 }} ref={ref} {...props}>
      {props.children}
    </Zoom>
  );
});

CustomTransition.displayName = 'CustomTransition';

export default CustomTransition;

import React from 'react';
import { FormControlLabel, FormGroup } from '@mui/material';
import { StyledDarkLightModeSwitch } from './DarkLightModeSwitch.style';

interface DarkLightModeSwitchProps {
  onChangeAction: () => void;
}
const DarkLightModeSwitch = ({ onChangeAction }: DarkLightModeSwitchProps) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<StyledDarkLightModeSwitch sx={{ m: 1 }} />}
        label=""
        onChange={onChangeAction}
      />
    </FormGroup>
  );
};

export default DarkLightModeSwitch;

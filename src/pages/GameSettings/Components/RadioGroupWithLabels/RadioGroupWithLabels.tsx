import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { GameAttributes } from 'types/models/Game/Games';
interface Option {
  value: string;
  label: string;
}
type FieldName =
  | 'playersNumber'
  | 'gameType'
  | 'finalScore'
  | 'playersName'
  | 'team'
  | `playersName.${number}`;

interface RadioGroupWithLabelsProps {
  options: Option[];
  name: FieldName;
  register: UseFormRegister<GameAttributes>;
  defaultValue: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const RadioGroupWithLabels: React.FC<RadioGroupWithLabelsProps> = ({
  options,
  name,
  register,
  defaultValue,
  onChange,
  label,
}) => {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={`${name}-radio-buttons-group-label`}
        defaultValue={defaultValue}
        onChange={(value) => {
          if (onChange) {
            onChange(value);
          }
        }}
      >
        <Grid>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}
              {...register(name)}
            />
          ))}
        </Grid>
      </RadioGroup>
    </>
  );
};
export default RadioGroupWithLabels;

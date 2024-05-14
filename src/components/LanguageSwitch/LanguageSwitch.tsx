import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { LanguagesList } from 'config/constant/language.config';
import React from 'react';
import { translate } from 'locales/i18n';

interface LanguageSwitchProps {
  onChangeLanguageAction: (event: React.ChangeEvent<{ value: unknown }>) => void;
  currentLanguage: string;
}
const LanguageSwitch = ({ onChangeLanguageAction, currentLanguage }: LanguageSwitchProps) => {
  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel id="demo-simple-select-label">{translate('Language')}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentLanguage}
        label="Algorithm"
        onChange={(event) => onChangeLanguageAction(event as React.ChangeEvent<{ value: unknown }>)}
        sx={{ width: 72, height: 40 }}
      >
        {LanguagesList.map((language) => (
          <MenuItem
            key={language.long}
            value={language.short}
            sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
          >
            <Grid>
              {/* {language.text} */}

              <img src={language.icon} width={28} height={20} />
            </Grid>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitch;

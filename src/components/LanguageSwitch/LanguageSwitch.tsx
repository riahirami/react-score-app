import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { LanguagesList } from 'config/constant/language.config';
import { useTranslation } from 'react-i18next';

interface LanguageSwitchProps {
  onChangeLanguageAction: (event: React.ChangeEvent<{ value: unknown }>) => void;
  currentLanguage: string;
}
const LanguageSwitch = ({ onChangeLanguageAction, currentLanguage }: LanguageSwitchProps) => {
  const { t } = useTranslation();
  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel id="demo-simple-select-label">{t('Language')}</InputLabel>
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
            <Typography>
              {/* {language.text} */}

              <img src={language.icon} width={28} height={20} />
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSwitch;

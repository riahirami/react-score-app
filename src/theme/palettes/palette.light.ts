import { PaletteOptions } from '@mui/material';
import { ColorsConfig } from 'utils/colors';
import { ThemeEnum } from 'utils/enum';

const lightPalette: PaletteOptions = {
  mode: ThemeEnum.LIGHT,
  primary: ColorsConfig.primary,
  secondary: ColorsConfig.secondary,
  info: ColorsConfig.info,
  success: ColorsConfig.success,
  warning: ColorsConfig.warning,
  error: ColorsConfig.error,
  grey: ColorsConfig.grey,
  background: ColorsConfig.background,
  text: ColorsConfig.text,
  action: ColorsConfig.actions,
};

export default lightPalette;

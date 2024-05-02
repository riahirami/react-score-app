import { Button, Grid } from '@mui/material';
import { images } from '../../../../utils/images';
import { StyledContainer, StyledImage } from './gameStartSection.styles';
import { useTranslation } from 'react-i18next';

interface GameGameStartSectionProps {
  handleOpen: () => void;
}

const GameStartSection = ({ handleOpen }: GameGameStartSectionProps) => {
  const { t } = useTranslation();
  return (
    <StyledContainer>
      <Grid>
        <StyledImage src={images.SEVEN} width={250} height={323} />
        <StyledImage src={images.JOKER} width={250} height={330} />
      </Grid>
      <Button onClick={handleOpen} variant="contained" sx={{ textTransform: 'capitalize' }}>
        {t('Game_Actions.New_Game')}
      </Button>
    </StyledContainer>
  );
};
export default GameStartSection;

import { Box, Button, Grid } from '@mui/material';
import { images } from '../../../../utils/images';
import { ImageContainer, StyledImage } from './gameStartSection.styles';

interface GameGameStartSectionProps {
  handleOpen: () => void;
}

const GameStartSection = ({ handleOpen }: GameGameStartSectionProps) => (
  <Grid style={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
    <Grid container style={{ justifyContent: 'center' }}>
      <ImageContainer>
        <StyledImage src={images.SEVEN} width={250} height={323} />
        <StyledImage src={images.JOKER} width={250} height={330} />
      </ImageContainer>
    </Grid>
    <Button onClick={handleOpen} variant="contained" sx={{ textTransform: 'capitalize' }}>
      Nouvelle partie
    </Button>
  </Grid>
);

export default GameStartSection;

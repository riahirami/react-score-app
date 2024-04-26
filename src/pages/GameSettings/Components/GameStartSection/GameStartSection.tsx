import { Box, Button, Grid } from '@mui/material';
import { images } from '../../../../utils/images';
import { ImageContainer, StyledContainer, StyledImage } from './gameStartSection.styles';

interface GameGameStartSectionProps {
  handleOpen: () => void;
}

const GameStartSection = ({ handleOpen }: GameGameStartSectionProps) => (
  <StyledContainer>
    <ImageContainer>
      <StyledImage src={images.SEVEN} width={250} height={323} />
      <StyledImage src={images.JOKER} width={250} height={330} />
    </ImageContainer>
    <Button onClick={handleOpen} variant="contained" sx={{ textTransform: 'capitalize' }}>
      Nouvelle partie
    </Button>
  </StyledContainer>
);

export default GameStartSection;

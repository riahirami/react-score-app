import { Button, Grid } from '@mui/material';
import { images } from '../../../../utils/images';
import { StyledContainer, StyledImage } from './gameStartSection.styles';

interface GameGameStartSectionProps {
  handleOpen: () => void;
}

const GameStartSection = ({ handleOpen }: GameGameStartSectionProps) => (
  <StyledContainer>
    <Grid>
      <StyledImage src={images.SEVEN} width={250} height={323} />
      <StyledImage src={images.JOKER} width={250} height={330} />
    </Grid>
    <Button onClick={handleOpen} variant="contained" sx={{ textTransform: 'capitalize' }}>
      Nouvelle partie
    </Button>
  </StyledContainer>
);

export default GameStartSection;

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Grid } from '@mui/material';
import { images } from '../../../../utils/images';
import {
  StyledButton,
  StyledButtonContainer,
  StyledContainer,
  StyledImage,
} from './gameStartSection.styles';
import { translate } from 'locales/i18n';

interface GameGameStartSectionProps {
  handleNewGameAction: () => void;
  handleJoinGame: () => void;
  handleResumeGame: () => void;
  handleListGameAction: () => void;
}

const GameStartSection = ({
  handleNewGameAction,
  handleJoinGame,
  handleResumeGame,
  handleListGameAction,
}: GameGameStartSectionProps) => {
  return (
    <StyledContainer>
      <Grid>
        <StyledImage src={images.SEVEN} width={250} height={323} />
        <StyledImage src={images.JOKER} width={250} height={330} />
      </Grid>
      <StyledButtonContainer container>
        <StyledButton onClick={handleNewGameAction} variant="contained">
          <AddCircleOutlineOutlinedIcon />
          {translate('Game_Actions.New_Game')}
        </StyledButton>
        <StyledButton onClick={handleJoinGame} variant="contained">
          <VisibilityOutlinedIcon />
          {translate('Game_Actions.Join_Game')}
        </StyledButton>
        <StyledButton onClick={handleResumeGame} variant="contained">
          <ExitToAppOutlinedIcon />
          {translate('Game_Actions.Resume_Game')}
        </StyledButton>
      </StyledButtonContainer>
      <StyledButton onClick={handleListGameAction} variant="contained">
        <ExitToAppOutlinedIcon />
        list games
      </StyledButton>
    </StyledContainer>
  );
};
export default GameStartSection;

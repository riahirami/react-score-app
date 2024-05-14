import React from 'react';
import { StyledGrid } from './CustomColumnGrid.style';
import { gridBreakPointsBasedOnPlayerNumber } from 'utils/helpers/helpers';
import { Game } from 'types/interfaces/game';
interface CustomColumnGridProps {
  children?: React.ReactNode;
  isMiddleGrid?: boolean;
  game?: Game;
}
const CustomColumnGrid = ({ children, isMiddleGrid, game }: CustomColumnGridProps) => {
  const gridBreakpoints =
    game && gridBreakPointsBasedOnPlayerNumber(isMiddleGrid, game.playersNumber);
  return (
    <StyledGrid xs={gridBreakpoints} md={gridBreakpoints} item>
      {children}
    </StyledGrid>
  );
};

export default CustomColumnGrid;

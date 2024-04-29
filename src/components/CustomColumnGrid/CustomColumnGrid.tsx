import React from 'react';
import { StyledGrid } from './CustomColumnGrid.style';
import useGameActions from 'hooks/useGameActions';
import { gridBreakPointsBasedOnPlayerNumber } from 'utils/helpers/helpers';
interface CustomColumnGridProps {
  children?: React.ReactNode;
  isMiddleGrid?: boolean;
}
const CustomColumnGrid = ({ children, isMiddleGrid }: CustomColumnGridProps) => {
  const { game } = useGameActions();

  const gridBreakpoints = gridBreakPointsBasedOnPlayerNumber(isMiddleGrid, game.playersNumber);

  return (
    <StyledGrid xs={gridBreakpoints} md={gridBreakpoints} item>
      {children}
    </StyledGrid>
  );
};

export default CustomColumnGrid;

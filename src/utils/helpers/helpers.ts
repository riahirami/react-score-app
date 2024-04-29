export const gridBreakPointsBasedOnPlayerNumber = (
  isMiddleGrid: boolean | undefined,
  playersNumber: number,
) => {
  if (!isMiddleGrid) {
    return 3;
  } else if (playersNumber === 2) {
    return 3;
  } else if (playersNumber === 3) {
    return 2;
  } else if (playersNumber === 4) {
    return 1.5;
  }
};

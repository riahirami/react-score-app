import { useState, useEffect, useRef } from 'react';
import { useAppSelector } from 'redux/hooks';
import { Game, Player } from 'types/interfaces/game';
import { GamePlayerNumberEnum, GamePlayerNumberToWinEnum, GameTypeEnum } from 'utils/enum';

interface useGameActionsProps {
  getWinnersPlayers: (players: Player[]) => Player[] | undefined;
  checkIfPlayerWin: (player: Player) => boolean;
  checkIfPlayerLost: (player: Player) => boolean;
  checkIfGameIsOver: () => boolean;
  winnerPlayers: Player[] | undefined;
  setWinnerPlayers: React.Dispatch<React.SetStateAction<Player[] | undefined>>;
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  ifPlayerOnLostPlayers: (player: Player) => boolean;
  ifPlayerOnWinnersPlayers: (player: Player) => boolean;
  isGameOverRef: React.MutableRefObject<boolean | undefined>;
  resetGame: () => void;
}

const useGameActions = (): useGameActionsProps => {
  const gameDetails = useAppSelector((state) => state.game);
  const [winnerPlayers, setWinnerPlayers] = useState<Player[] | undefined>([]);
  const [lostPlayers, setLostPlayers] = useState<Player[] | undefined>([]);

  const isGameOverRef = useRef<boolean | undefined>(undefined);
  const [game, setGame] = useState<Game>({
    gameType: gameDetails.gameType,
    playersNumber: gameDetails.playersNumber,
    finalScore: gameDetails.finalScore ?? 0,
    players: gameDetails.players,
    rounds: [],
    team: gameDetails.team,
  });

  useEffect(() => {
    setWinnerPlayers(getWinnersPlayers(game.players));
  }, [game.rounds.length]);

  const getWinnersPlayers = (players: Player[]): Player[] => {
    if (game.finalScore) {
      const hasPlayerExceededFinalScore = players.some((player) => player.score >= game.finalScore);
      if (!hasPlayerExceededFinalScore) {
        return [];
      }
      if (game.gameType === GameTypeEnum.CHKOBBA) {
        return players.filter((player) => player.score >= game.finalScore);
      } else {
        const lost = players.filter((player) => player.score > game.finalScore);
        setLostPlayers((prevState) => [...lost]);
        if (
          players.length - lost.length === 1 &&
          winnerPlayers &&
          lost.length > winnerPlayers?.length
        ) {
          return players.filter(
            (player) => !lost.some((lostPlayer) => lostPlayer.name === player.name),
          );
        }
      }
    }
    return [];
  };
  const numberOfPlayerToWin = (): number => {
    switch (game.playersNumber.toString()) {
      case GamePlayerNumberEnum.TWO.toString():
      case GamePlayerNumberEnum.THREE.toString():
        return GamePlayerNumberToWinEnum.ONE;
      case GamePlayerNumberEnum.FOUR.toString():
        return GamePlayerNumberToWinEnum.TWO;
      default:
        return 0;
    }
  };

  const checkIfPlayerWin = (player: Player): boolean => {
    if (checkIfGameIsOver()) {
      if (game.gameType === GameTypeEnum.CHKOBBA) {
        return player.score >= game.finalScore;
      }
      return player.score < game.finalScore;
    }
    return false;
  };

  const checkIfPlayerLost = (player: Player): boolean => {
    if (checkIfGameIsOver()) {
      if (game.gameType === GameTypeEnum.CHKOBBA) {
        return player.score < game.finalScore;
      }
      return player.score >= game.finalScore;
    }
    return false;
  };

  const ifPlayerOnLostPlayers = (player: Player): boolean => {
    return !!lostPlayers?.some((lostPlayer) => lostPlayer.name === player.name);
  };

  const ifPlayerOnWinnersPlayers = (player: Player): boolean => {
    return !!winnerPlayers?.some((winnerPlayer) => winnerPlayer.name === player.name);
  };

  const checkIfGameIsOver = (): boolean => {
    if (winnerPlayers && game.gameType === GameTypeEnum.CHKOBBA) {
      isGameOverRef.current = winnerPlayers.length >= numberOfPlayerToWin();
      return winnerPlayers.length >= numberOfPlayerToWin();
    } else {
      if (
        winnerPlayers &&
        winnerPlayers?.length > 0 &&
        lostPlayers &&
        lostPlayers.length >= winnerPlayers.length
      ) {
        isGameOverRef.current = lostPlayers.length > game.playersNumber % 2;
        return lostPlayers.length > game.playersNumber % 2;
      }
    }
    isGameOverRef.current = false;
    return false;
  };

  const resetGame = (): void => {
    setGame({
      gameType: game.gameType,
      playersNumber: game.playersNumber,
      finalScore: game.finalScore,
      players: game.players.map((player) => ({
        ...player,
        score: 0,
        rounds: [],
      })),
      rounds: [],
      team: game.team,
    });
    setWinnerPlayers([]);
    setLostPlayers([]);
  };
  return {
    getWinnersPlayers,
    checkIfPlayerWin,
    checkIfPlayerLost,
    checkIfGameIsOver,
    winnerPlayers,
    setWinnerPlayers,
    game,
    setGame,
    ifPlayerOnLostPlayers,
    ifPlayerOnWinnersPlayers,
    isGameOverRef,
    resetGame,
  };
};

export default useGameActions;

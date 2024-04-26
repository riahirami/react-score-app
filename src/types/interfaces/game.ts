export interface Player {
  name: string;
  score: number;
}
export interface Score {
  playerIndex: number;
  score: number;
}
export interface Round {
  roundNumber: number;
  playersScore: Score[];
}

export interface Game {
  gameType: string;
  playersNumber: number;
  finalScore: number;
  players: Player[];
  rounds: Round[];
  team?: boolean;
}

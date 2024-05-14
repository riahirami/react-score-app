export interface Player {
  playerIndex: number;
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
  createdBy?: string;
  gameId?: string;
}

export interface GameFbResponse {
  createdBy: string;
  finalScore: number;
  gameType: string;
  players: Player[];
  playersNumber: number;
  team: boolean;
  gameId: string;
  rounds: Round[];
  key: string;
  isGameOver: boolean;
}

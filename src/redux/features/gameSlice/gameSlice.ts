import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GameTypeEnum } from '../../../utils/enum';
import { Player } from 'types/interfaces/game';

interface GameState {
  players: Player[];
  playersNumber: number;
  gameType: GameTypeEnum;
  finalScore?: number;
  isGameOver: boolean;
  isGameStarted?: boolean;
  team?: boolean;
  createdBy?: string;
  gameCode?: string;
}

const initialState: GameState = {
  players: [],
  playersNumber: 2,
  gameType: GameTypeEnum.RAMI,
  isGameOver: false,
  isGameStarted: false,
  team: false,
  createdBy: '',
  gameCode: '',
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayersNumber: (state, action: PayloadAction<number>) => {
      state.playersNumber = action.payload;
    },
    setGameType: (state, action: PayloadAction<GameTypeEnum>) => {
      state.gameType = action.payload;
    },
    setGameOver: (state) => {
      state.isGameOver = true;
      state.isGameStarted = false;
      state.team = false;
    },
    setFinalScore: (state, action: PayloadAction<number>) => {
      state.finalScore = action.payload;
    },
    setGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStarted = action.payload;
    },
    setPlayers: (state, action: PayloadAction<string[]>) => {
      state.players = action.payload.map((playerName) => ({
        playerIndex: action.payload.indexOf(playerName) + 1,
        name: playerName,
        score: 0,
      }));
    },
    toggleGameTeamMode: (state, action: PayloadAction<boolean>) => {
      state.team = action.payload;
    },
    setGameCreatedBy: (state, action: PayloadAction<string>) => {
      state.createdBy = action.payload;
    },
    setGameCode: (state, action: PayloadAction<string>) => {
      state.gameCode = action.payload;
    },
  },
});

export const {
  setGameType,
  setPlayers,
  setGameOver,
  setFinalScore,
  setPlayersNumber,
  setGameStarted,
  toggleGameTeamMode,
  setGameCreatedBy,
  setGameCode,
} = gameSlice.actions;

export const selectGame = (state: { game: GameState }) => state.game;

export default gameSlice;

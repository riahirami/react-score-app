import { GameTypeEnum } from './enum';

export const GAME_SCREEN_MIN_WIDTH = '400px';

export const PLAYERS_NUMBER_RADIO_OPTIONS = [
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

export const GAME_TYPE_RADIO_OPTIONS = [
  { value: GameTypeEnum.RAMI, label: GameTypeEnum.RAMI },
  { value: GameTypeEnum.CHKOBBA, label: GameTypeEnum.CHKOBBA },
];

export const GAME_NUMBER_OF_DEFAULT_PLAYER = '2';

export const CONFIRM_STRING = 'Confirm';
export const CANCEL_STRING = 'Cancel';

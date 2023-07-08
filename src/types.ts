import { Dispatch, SetStateAction } from 'react';

export interface IMessage {
  uid: string;
  message: string;
  name: string;
  photoURL: string;
  createdAt?: number;
}

export interface ColorSets {
  greenSet: Set<string>;
  yellowSet: Set<string>;
  blackSet: Set<string>;
}
export interface KeyboardProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  submitAttempt: (inputValue: string) => void;
  charColors: ColorSets;
  disabled: boolean;
}

export interface GameFieldProps {
  attemptsArray: string[];
  attemptsColors: string[];
  isError?: boolean;
  animate?: boolean;
  attemptsCount?: number;
}

export interface GameResultProps {
  result: 'win' | 'loss' | '';
  count?: number;
  answer?: string;
  ref?: HTMLElement;
  setGameResult?: Dispatch<SetStateAction<"" | "win" | "loss">>
}


export type GameMode = '' | 'train' | 'challenge';
export type GameResult = 'loss' | 'win' | '';
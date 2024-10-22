export interface NameState {
  name: string;
  setName: (name: string) => void;
}

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  unrepeated: boolean;
}

export interface CalculatorState {
  expression: string;
  result: string;
}

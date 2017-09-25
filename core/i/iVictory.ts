import IPlayer from "./iPlayer";

export default interface IVictory {
  winner: IPlayer | null;
  line: ILine | null;
}

export interface ILine {
  first: number[];
  second: number[];
  third: number[];
}

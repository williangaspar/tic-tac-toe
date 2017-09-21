import ICell from "./iCell";

export default interface IGrid {
  setCell(x: number, y: number, play: number): boolean;
  getCell(x: number, y: number): number;
  isVictory(play: number): boolean;
  isFull(): boolean;
  getGrid(): ICell[][];
}

import ICell from "./iCell";

export default interface ICPU {
  play(grid: ICell[][]): number[];
}

import ICell from "./i/iCell";
import IGrid from "./i/iGrid";
import { ILine } from "./i/iVictory";

export default class Grid implements IGrid {

  private cellGrid: ICell[][];
  private range = [0, 1, 2];
  private plays = 0;

  constructor(Cell: new () => ICell) {
    this.cellGrid = this.range.map(() => []);
    this.runGrid(addCell.bind(this));
    function addCell(x: number, y: number) {
      this.cellGrid[x][y] = new Cell();
    }
  }

  public reset(): void {
    this.plays = 0;
    this.runGrid(reset.bind(this));
    function reset(x: number, y: number) {
      this.cellGrid[x][y].reset();
    }
  }

  public setCell(x: number, y: number, play: number): boolean {
    if (x in this.range && y in this.range) {
      const cell = this.cellGrid[x][y];
      let success = false;
      if (cell) {
        success = cell.set(play);
        this.plays += success ? 1 : 0;
      }
      return success;
    }
    return false;
  }

  public getCell(x: number, y: number): number {
    if (x in this.range && y in this.range) {
      return this.cellGrid[x][y].get();
    }
    return -1;
  }

  public getVictoryLine(play: number): ILine | null {
    let victory = null;
    const userGrid = this.getUserGrid(play);
    victory =
      this.isVerticallVictory(userGrid) ||
      this.isHorizontalVictory(userGrid) ||
      this.isDiagonalVictory(userGrid);

    return victory;
  }

  public isFull(): boolean {
    return this.plays === 9;
  }

  public getGrid(): number[][] {
    function map(item: ICell[]) {
      return item.map((innerItem) => innerItem.get());
    }
    return this.cellGrid.map(map);
  }

  private getUserGrid(play: number): number[][] {
    const grid: any[][] = this.range.map(() => []);
    function check(x: number, y: number) {
      grid[x][y] = this.cellGrid[x][y].get() === play ? play : null;
    }
    this.runGrid(check.bind(this));
    return grid;
  }

  private isVerticallVictory(grid: number[][]): ILine | null {
    for (let i = 0; i < this.range.length; i++) {
      if (grid[i].filter((item) => item !== null).length === 3) {
        return { first: [i, 0], second: [i, 1], third: [i, 2] };
      }
    }
    return null;
  }

  private isHorizontalVictory(grid: number[][]): ILine | null {
    for (let i = 0; i < this.range.length; i++) {
      if (grid[0][i] && grid[1][i] && grid[2][i]) {
        return { first: [0, i], second: [1, i], third: [2, i] };
      }
    }
    return null;
  }

  private isDiagonalVictory(grid: number[][]): ILine | null {
    if (grid[0][0] !== null && grid[1][1] !== null && grid[2][2] !== null) {
      return { first: [0, 0], second: [1, 1], third: [2, 2] };
    }

    if (grid[2][0] !== null && grid[1][1] !== null && grid[0][2] !== null) {
      return { first: [2, 0], second: [1, 1], third: [0, 2] };
    }

    return null;
  }

  private runGrid(action: Function): void {
    for (let i = 0; i < this.range.length; i++) {
      for (let j = 0; j < this.range.length; j++) {
        action(i, j);
      }
    }
  }
}

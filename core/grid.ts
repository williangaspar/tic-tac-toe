import ICell from "./i/iCell";
import IGrid from "./i/iGrid";

export default class Grid implements IGrid {

  private cellGrid: ICell[][];
  private range = [0, 1, 2];
  private plays = 0;

  constructor(Cell: new () => ICell) {
    this.cellGrid = this.range.map(() => []);
    function addCell(x: number, y: number) {
      this.cellGrid[x][y] = new Cell();
    }
    this.runGrid(addCell.bind(this));
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

  public isVictory(play: number): boolean {
    let victory = false;
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

  public getGrid(): ICell[][] {
    function clone(item: ICell[]) {
      return item.map((innerItem) => innerItem);
    }
    return this.cellGrid.map(clone);
  }

  private getUserGrid(play: number): number[][] {
    const grid: any[][] = this.range.map(() => []);
    function check(x: number, y: number) {
      grid[x][y] = this.cellGrid[x][y].get() === play ? play : null;
    }
    this.runGrid(check.bind(this));
    return grid;
  }

  private isVerticallVictory(grid: number[][]): boolean {
    for (let i = 0; i < this.range.length; i++) {
      if (grid[i].filter((item) => item !== null).length === 3) {
        return true;
      }
    }
    return false;
  }

  private isHorizontalVictory(grid: number[][]): boolean {
    for (let i = 0; i < this.range.length; i++) {
      if (grid[0][i] && grid[1][i] && grid[2][i]) {
        return true;
      }
    }
    return false;
  }

  private isDiagonalVictory(grid: number[][]): boolean {
    if (grid[0][0] !== null && grid[1][1] !== null && grid[2][2] !== null) {
      return true;
    } else if (grid[2][0] !== null && grid[1][1] !== null && grid[0][2] !== null) {
      return true;
    }
    return false;
  }

  private runGrid(action: Function): void {
    for (let i = 0; i < this.range.length; i++) {
      for (let j = 0; j < this.range.length; j++) {
        action(i, j);
      }
    }
  }
}

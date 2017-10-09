import Play from "./e/ePlay";
import ICPU from "./i/iCpu";
import IGrid from "./i/iGrid";

export default class CPU implements ICPU {
  private player: number;
  private grid: IGrid;

  constructor(play: number, grid: IGrid) {
    this.player = play;
    this.grid = grid;
  }

  public play(): number[] {
    const grid = this.grid.getGrid();
    let play: number[];

    play = this.tryToWin(grid);
    if (play.length) {
      return play;
    }

    play = this.avoidToLose(grid);
    if (play.length) {
      return play;
    }

    return this.randomGuess(grid);
  }

  private tryToWin(grid: number[][]): number[] {
    return this.findGap(grid, this.player);
  }

  private avoidToLose(grid: number[][]): number[] {
    const otherPlayer = this.player === Play.X ? Play.O : Play.X;
    return this.findGap(grid, otherPlayer);
  }

  private randomGuess(grid: number[][]): number[] {
    const available = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === -1) {
          available.push([i, j]);
        }
      }
    }
    const index = Math.floor(Math.random() * available.length);
    return available[index];
  }

  private findGap(grid: number[][], play: number): number[] {
    let index = -1;

    // Horizontal
    for (let i = 0; i < 3; i++) {
      index = this.findGapInLine(grid[i], play);
      if (index > -1) {
        return [i, index];
      }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
      index = this.findGapInLine([grid[0][i], grid[1][i], grid[2][i]], play);
      if (index > -1) {
        return [index, i];
      }
    }

    // Diagonal 1
    index = this.findGapInLine([grid[0][0], grid[1][1], grid[2][2]], play);
    if (index > -1) {
      return [index, index];
    }

    // Diagonal 2
    const diagonal = [[0, 2], [1, 1], [2, 0]];
    index = this.findGapInLine([grid[0][2], grid[1][1], grid[2][0]], play);
    if (index > -1) {
      return diagonal[index];
    }

    return [];
  }

  private findGapInLine(line: number[], play: number): number {
    if (line[0] === play && line[1] === play && line[2] === -1) {
      return 2;
    }
    if (line[0] === play && line[2] === play && line[1] === -1) {
      return 1;
    }
    if (line[1] === play && line[2] === play && line[0] === -1) {
      return 0;
    }

    return -1;
  }
}

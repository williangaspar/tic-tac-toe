import Play from "./e/ePlay";
import ICell from "./i/iCell";
import ICPU from "./i/iCpu";

export default class CPU implements ICPU {
  private player: number;

  constructor(player: number) {
    this.player = player;
  }

  public play(grid: ICell[][]): number[] {

    let play = this.tryToWin(grid);

    if (play.length) {
      return play;
    }

    play = this.avoidToLose(grid);

    if (play.length) {
      return play;
    }

    return this.randomGuess(grid);
  }

  private tryToWin(grid: ICell[][]): number[] {
    return this.findSpotBetween(grid, this.player);
  }

  private avoidToLose(grid: ICell[][]): number[] {
    const player2 = this.player === Play.X ? Play.O : Play.X;
    return this.findSpotBetween(grid, player2);
  }

  private randomGuess(grid: ICell[][]): number[] {
    const available = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j].get() === -1) {
          available.push([i, j]);
        }
      }
    }
    const index = Math.floor(Math.random() * available.length);
    return available[index];
  }

  private findSpotBetween(grid: ICell[][], play: number): number[] {
    let index = -1;

    // Horizontal
    for (let i = 0; i < 3; i++) {
      index = this.findSpotInLine(grid[i], play);
      if (index > -1) {
        return [i, index];
      }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
      index = this.findSpotInLine([grid[0][i], grid[1][i], grid[2][i]], play);
      if (index > -1) {
        return [index, i];
      }
    }

    // Diagonal 1
    index = this.findSpotInLine([grid[0][0], grid[1][1], grid[2][2]], play);
    if (index > -1) {
      return [index, index];
    }

    // Diagonal 2
    const diagonal = [[0, 2], [1, 1], [2, 0]];
    index = this.findSpotInLine([grid[0][2], grid[1][1], grid[2][0]], play);
    if (index > -1) {
      return diagonal[index];
    }

    return [];
  }

  private findSpotInLine(line: ICell[], play: number): number {
    if (line[0].get() === play && line[1].get() === play && line[2].get() === -1) {
      return 2;
    }
    if (line[0].get() === play && line[2].get() === play && line[1].get() === -1) {
      return 1;
    }
    if (line[1].get() === play && line[2].get() === play && line[0].get() === -1) {
      return 0;
    }

    return -1;
  }
}

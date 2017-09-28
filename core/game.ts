import IGame from "./i/iGame";
import IGrid from "./i/iGrid";
import IPlayer from "./i/iPlayer";
import IVictory from "./i/iVictory";
import ICell from "./i/iCell";

export default class Game implements IGame {
  private grid: IGrid;
  private player1: IPlayer;
  private player2: IPlayer;
  private turn: number;
  private gameOverCb: (victory: IVictory | null) => void;

  constructor(grid: IGrid) {
    this.grid = grid;
  }

  public start(player1: IPlayer, player2: IPlayer): void {
    this.turn = player1.isStarter ? player1.play : player2.play;
    this.player1 = player1;
    this.player2 = player2;
    this.grid.reset();
  }

  public play(x: number, y: number): boolean {
    const play = this.turn;
    const success = this.grid.setCell(x, y, play);
    this.turn = this.turn === this.player1.play ? this.player2.play : this.player1.play;
    this.checkGameOver(success, play);
    return success;
  }

  public onGameOver(cb: (victory: IVictory | null) => void): void {
    this.gameOverCb = cb;
  }

  public getTurn(): number {
    return this.turn;
  }

  public getGrid(): ICell[][] {
    return this.grid.getGrid();
  }

  private checkGameOver(success: boolean, play: number) {
    if (success) {
      const line = this.grid.getVictoryLine(play);
      if (line) {
        const winner = play === this.player1.play ? this.player1 : this.player2;
        this.gameOverCb({ winner, line });
      } else if (this.grid.isFull()) {
        this.gameOverCb(null);
      }
    }
  }
}

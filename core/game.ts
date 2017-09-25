import IGame from "./i/iGame";
import IGrid from "./i/iGrid";
import IPlayer from "./i/iPlayer";
import IVictory from "./i/iVictory";

export default class Game implements IGame {
  private grid: IGrid;
  private player1: IPlayer;
  private player2: IPlayer;
  private turn: number;

  public start(player1: IPlayer, player2: IPlayer, grid: IGrid): void {
    this.turn = player1.isStarter ? player1.play : player2.play;
    this.player1 = player1;
    this.player2 = player2;
    this.grid = grid;
  }

  public play(x: number, y: number): boolean {
    const play = this.turn;
    this.turn = this.turn === this.player1.play ? this.player2.play : this.player1.play;
    return this.grid.setCell(x, y, play);
  }

  public onGameOver(cb: (victory: IVictory) => void): void {
    throw new Error("Method not implemented.");
  }
}

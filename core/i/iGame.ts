import IGrid from "./iGrid";
import IPlayer from "./iPlayer";
import IVictory from "./iVictory";

export default interface IGame {
  start(player1: IPlayer, player2: IPlayer, grid: IGrid): void;
  play(x: number, y: number): boolean;
  onGameOver(cb: (victory: IVictory) => void): void;
}

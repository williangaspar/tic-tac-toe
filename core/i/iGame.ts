import IPlayer from "./iPlayer";

export default interface IGame {
  start(player1: IPlayer, player2: IPlayer): void;
  play(x: number, y: number): boolean;
}

import Cell from "./core/cell";
import Grid from "./core/grid";
import Player from "./core/player";
import Game from "./core/game";
import IGame from "./core/i/iGame";
import CPU from "./core/cpu";
import IVictory from "./core/i/iVictory";

function game(): IGame {
  const grid = new Grid(Cell);
  return new Game(grid);
}

export default game;
export { Player, CPU, IGame, IVictory };

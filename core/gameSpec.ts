import Cell from "./cell";
import Play from "./e/ePlay";
import Game from "./game";
import Grid from "./grid";
import IVictory from "./i/iVictory";
import Player from "./player";

describe("Game", function () {
  let game: Game;
  let grid: Grid;
  let player1: Player;
  let player2: Player;

  beforeEach(function (done) {
    grid = new Grid(Cell);
    game = new Game();
    player1 = new Player("P1", Play.X, true);
    player2 = new Player("P2", Play.O, false);
    done();
  });

  it("start/play: who plays first", function (done) {
    function start(first: Player, second: Player) {
      grid = new Grid(Cell);
      first.isStarter = true;
      second.isStarter = false;
      game.start(first, second, grid);
      game.play(0, 0);
      expect(grid.getCell(0, 0)).toBe(first.play);
    }

    start(player1, player2);
    start(player2, player1);
    done();
  });

  it("play: must change turs", function (done) {
    game.start(player1, player2, grid);

    function play(x: number, y: number, playExpect: number) {
      game.play(x, y);
      expect(grid.getCell(x, y)).toBe(playExpect);
    }

    play(0, 0, player1.play);
    play(1, 1, player2.play);
    play(2, 2, player1.play);
    done();
  });
});

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

  it("gameover by victory", function (done) {
    game.onGameOver(onVictory);

    function onVictory(victory: IVictory) {
      // Need to check all this stuff because of typescript null restriction
      expect(victory).not.toBeNull();
      expect(victory.line).not.toBeNull();
      expect(victory.winner).not.toBeNull();

      if (victory && victory.line && victory.winner) {
        expect(victory.winner.play).toBe(player1.play);
        expect(victory.line.first[0]).toBe(0);
        expect(victory.line.first[1]).toBe(0);
        expect(victory.line.second[0]).toBe(1);
        expect(victory.line.second[1]).toBe(1);
        expect(victory.line.third[0]).toBe(2);
        expect(victory.line.third[1]).toBe(2);
      }
      done();
    }

    game.start(player1, player2, grid);

    game.play(0, 0); // p1
    game.play(0, 1);
    game.play(1, 1); // p1
    game.play(0, 2);
    game.play(2, 2); // p1
  });

  it("gameover by full grid", function (done) {
    game.onGameOver(onGameOver);
    game.start(player1, player2, grid);

    grid.setCell(0, 2, player2.play);
    grid.setCell(2, 2, player2.play);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        game.play(i, j);
      }
    }

    function onGameOver(victory: IVictory) {
      const g = grid.getGrid();
      expect(victory).toBeNull();
      done();
    }
  });

});

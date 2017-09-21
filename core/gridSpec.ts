import Cell from "./cell";
import Play from "./e/ePlay";
import Grid from "./grid";

describe("Grid", function () {
  let grid: Grid;

  beforeEach(function (done) {
    grid = new Grid(Cell);
    done();
  });

  it("set and get Cell X", function (done) {
    expect(grid.setCell(0, 0, Play.X)).toBe(true);
    expect(grid.getCell(0, 0)).toBe(Play.X);
    done();
  });

  it("set and get Cell O", function (done) {
    expect(grid.setCell(1, 2, Play.O)).toBe(true);
    expect(grid.getCell(1, 2)).toBe(Play.O);
    done();
  });

  it("set and get Cell invalid position", function (done) {
    grid.setCell(0, 0, Play.X);
    expect(grid.setCell(0, 0, Play.O)).toBe(false);

    expect(grid.setCell(100, 100, Play.X)).toBe(false);
    expect(grid.getCell(100, 100)).toBe(-1);
    done();
  });

  it("vertical victory", function (done) {
    const play = Play.O;
    grid.setCell(1, 0, play);
    grid.setCell(1, 1, play);
    grid.setCell(1, 2, play);
    expect(grid.isVictory(play)).toBe(true);
    done();
  });

  it("horizontal victory", function (done) {
    const play = Play.X;
    grid.setCell(0, 0, play);
    grid.setCell(1, 0, play);
    grid.setCell(2, 0, play);
    expect(grid.isVictory(play)).toBe(true);
    done();
  });

  it("vertical victory left to right", function (done) {
    const play = Play.O;
    grid.setCell(0, 0, play);
    grid.setCell(1, 1, play);
    grid.setCell(2, 2, play);
    expect(grid.isVictory(play)).toBe(true);
    done();
  });

  it("vertical victory right to left", function (done) {
    const play = Play.X;
    grid.setCell(2, 0, play);
    grid.setCell(1, 1, play);
    grid.setCell(0, 2, play);
    expect(grid.isVictory(play)).toBe(true);
    done();
  });

  it("no victory", function (done) {
    const play = Play.O;
    expect(grid.isVictory(play)).toBe(false);

    grid.setCell(0, 0, play);
    grid.setCell(0, 1, play);
    expect(grid.isVictory(play)).toBe(false);

    grid.setCell(1, 0, play);
    grid.setCell(1, 1, Play.X);
    grid.setCell(1, 2, play);
    expect(grid.isVictory(play)).toBe(false);
    done();
  });

  it("full grid", function (done) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid.setCell(i, j, Play.X);
      }
    }
    expect(grid.isFull()).toBe(true);
    done();
  });

  it("not full grid", function (done) {
    expect(grid.isFull()).toBe(false);

    grid.setCell(1, 1, Play.X);
    expect(grid.isFull()).toBe(false);

    for (let i = 0; i < 10; i++) {
      grid.setCell(i, 0, Play.X);
    }
    expect(grid.isFull()).toBe(false);
    done();
  });

});

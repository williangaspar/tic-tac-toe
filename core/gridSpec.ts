import Cell from "./cell";
import Play from "./e/ePlay";
import Grid from "./grid";
import { ILine } from "./i/iVictory";

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

  function checkVictory(coordinates: ILine, play: number) {
    grid.setCell(coordinates.first[0], coordinates.first[1], play);
    grid.setCell(coordinates.second[0], coordinates.second[1], play);
    grid.setCell(coordinates.third[0], coordinates.third[1], play);

    const line = grid.getVictoryLine(play);

    // Need to check if there is a line because of typescript null restriction
    expect(line).not.toBeNull();
    if (line) {
      expect(line.first[0]).toBe(coordinates.first[0]);
      expect(line.first[1]).toBe(coordinates.first[1]);
      expect(line.second[0]).toBe(coordinates.second[0]);
      expect(line.second[1]).toBe(coordinates.second[1]);
      expect(line.third[0]).toBe(coordinates.third[0]);
      expect(line.third[1]).toBe(coordinates.third[1]);
    }
  }

  it("vertical victory", function (done) {
    checkVictory({ first: [1, 0], second: [1, 1], third: [1, 2] }, Play.O);
    done();
  });

  it("horizontal victory", function (done) {
    checkVictory({ first: [0, 0], second: [1, 0], third: [2, 0] }, Play.X);
    done();
  });

  it("vertical victory left to right", function (done) {
    checkVictory({ first: [0, 0], second: [1, 1], third: [2, 2] }, Play.O);
    done();
  });

  it("vertical victory right to left", function (done) {
    checkVictory({ first: [2, 0], second: [1, 1], third: [0, 2] }, Play.X);
    done();
  });

  it("no victory", function (done) {
    const play = Play.O;
    expect(grid.getVictoryLine(play)).toBeNull();

    grid.setCell(0, 0, play);
    grid.setCell(0, 1, play);
    expect(grid.getVictoryLine(play)).toBeNull();

    grid.setCell(1, 0, play);
    grid.setCell(1, 1, Play.X);
    grid.setCell(1, 2, play);
    expect(grid.getVictoryLine(play)).toBeNull();
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

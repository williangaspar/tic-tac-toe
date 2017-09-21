import Cell from "./cell";
import CPU from "./cpu";
import Play from "./e/ePlay";
import ICell from "./i/iCell";
import ICPU from "./i/iCpu";

describe("CPU", function () {
  let cpu: ICPU;
  let cellGrid: ICell[][];

  beforeEach(function (done) {
    cpu = new CPU(Play.X);
    cellGrid = [[], [], []];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cellGrid[i][j] = new Cell();
      }
    }

    done();
  });

  it("Play to win vertical", function (done) {
    const play = Play.X;
    cellGrid[0][0].set(play);
    cellGrid[0][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win horizontal", function (done) {
    const play = Play.X;
    cellGrid[0][1].set(play);
    cellGrid[2][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1);
    done();
  });

  it("Play to win vertical left to right", function (done) {
    const play = Play.X;
    cellGrid[0][0].set(play);
    cellGrid[1][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win vertical right to left ", function (done) {
    const play = Play.X;
    cellGrid[2][0].set(play);
    cellGrid[1][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(2);
    done();
  });

  it("Avoid to lose vertical", function (done) {
    const play = Play.O;
    cellGrid[1][0].set(play);
    cellGrid[1][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win horizontal", function (done) {
    const play = Play.O;
    cellGrid[0][0].set(play);
    cellGrid[2][2].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1);
    done();
  });

  it("Play to win vertical left to right", function (done) {
    const play = Play.O;
    cellGrid[0][0].set(play);
    cellGrid[1][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win vertical right to left ", function (done) {
    const play = Play.O;
    cellGrid[2][0].set(play);
    cellGrid[1][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play random guess", function (done) {
    const play = Play.X;
    cellGrid[1][1].set(play);
    const result = cpu.play(cellGrid);
    expect(result[0]).toBeLessThan(3);
    expect(result[0]).toBeGreaterThan(-1);

    expect(result[1]).toBeLessThan(3);
    expect(result[1]).toBeGreaterThan(-1);

    expect(result[0]).not.toBe(1);
    expect(result[1]).not.toBe(1);

    done();
  });
});

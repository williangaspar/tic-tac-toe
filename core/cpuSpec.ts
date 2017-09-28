import Cell from "./cell";
import CPU from "./cpu";
import Play from "./e/ePlay";
import ICPU from "./i/iCpu";
import IGrid from "./i/iGrid";
import { ILine } from "./i/iVictory";

describe("CPU", function () {
  let cpu: ICPU;
  let grid: IGrid;
  let cellGrid: number[][];

  beforeEach(function (done) {
    cellGrid = [[], [], []];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        cellGrid[i][j] = -1;
      }
    }
    grid = {
      getGrid: () => cellGrid,
    } as IGrid;

    cpu = new CPU(Play.X, grid);

    done();
  });

  it("Play to win vertical", function (done) {
    const play = Play.X;
    cellGrid[0][0] = play;
    cellGrid[0][1] = play;
    const result = cpu.play();
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win horizontal", function (done) {
    const play = Play.X;
    cellGrid[0][1] = play;
    cellGrid[2][1] = play;
    const result = cpu.play();
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1);
    done();
  });

  it("Play to win vertical left to right", function (done) {
    const play = Play.X;
    cellGrid[0][0] = play;
    cellGrid[1][1] = play;
    const result = cpu.play();
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win vertical right to left ", function (done) {
    const play = Play.X;
    cellGrid[2][0] = play;
    cellGrid[1][1] = play;
    const result = cpu.play();
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(2);
    done();
  });

  it("Avoid to lose vertical", function (done) {
    const play = Play.O;
    cellGrid[1][0] = play;
    cellGrid[1][1] = play;
    const result = cpu.play();
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win horizontal", function (done) {
    const play = Play.O;
    cellGrid[0][0] = play;
    cellGrid[2][2] = play;
    const result = cpu.play();
    expect(result[0]).toBe(1);
    expect(result[1]).toBe(1);
    done();
  });

  it("Play to win vertical left to right", function (done) {
    const play = Play.O;
    cellGrid[0][0] = play;
    cellGrid[1][1] = play;
    const result = cpu.play();
    expect(result[0]).toBe(2);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play to win vertical right to left ", function (done) {
    const play = Play.O;
    cellGrid[2][0] = play;
    cellGrid[1][1] = play;
    const result = cpu.play();
    expect(result[0]).toBe(0);
    expect(result[1]).toBe(2);
    done();
  });

  it("Play random guess", function (done) {
    const play = Play.O;
    cellGrid[1][1] = play;

    const result = cpu.play();
    expect(result[0]).toBeLessThan(3);
    expect(result[0]).toBeGreaterThan(-1);

    expect(result[1]).toBeLessThan(3);
    expect(result[1]).toBeGreaterThan(-1);

    expect(result[0] === 1 && result[1] === 1).toBe(false);

    done();
  });
});

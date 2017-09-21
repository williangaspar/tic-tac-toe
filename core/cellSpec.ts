import Cell from "./cell";
import Play from "./e/ePlay";
import ICell from "./i/iCell";

function insert(cell: ICell, valor: number) {
  const result = cell.set(valor);
  expect(result).toBe(true);
  expect(cell.get()).toBe(valor);
}

describe("Cell", function () {
  let cell: ICell;

  beforeEach(function (done) {
    cell = new Cell();
    done();
  });

  it("Insert X", function (done) {
    insert(cell, Play.X);
    done();
  });

  it("Insert O", function (done) {
    insert(cell, Play.O);
    done();
  });

  it("Hold on to value", function (done) {
    cell.set(Play.X);
    const result = cell.set(Play.O);
    expect(result).toBe(false);
    expect(cell.get()).toBe(Play.X);
    done();
  });

  it("Invalid value", function (done) {
    const result = cell.set(100);
    expect(result).toBe(false);
    expect(cell.get()).toBe(-1);
    done();
  });
});

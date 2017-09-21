import Play from "./e/ePlay";
import ICell from "./i/iCell";

export default class Cell implements ICell {
  private state: number = -1;

  public set(value: number): boolean {
    if (this.state === -1 && value in Play) {
      this.state = value;
      return true;
    } else {
      return false;
    }
  }

  public get(): number {
    return this.state;
  }
}

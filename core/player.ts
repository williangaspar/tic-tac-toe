import IPlayer from "./i/iPlayer";

export default class Player implements IPlayer {
  public name: string;
  public play: number;
  public score: number;
  public isStarter: boolean;

  constructor(name: string, play: number, isStarter: boolean) {
    this.name = name;
    this.play = play;
    this.isStarter = isStarter;
    this.score = 0;
  }

}

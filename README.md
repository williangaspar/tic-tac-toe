## Tic-Tac-Toe TypeScprit + Jasmine

This is the logic implementation of a Tic-Tac-Toe game. It's not bounded to any particular framework so you can plug on anyone.

### Install

You can clone the repository or just download the `dist` folder.

* When opted for clone run `npm install` to install dependencies. And remember: there is no UI.
* But if you opted for the `dist`, the only thing the project needs is `typescript` configured. 


### How to use

This is the basic setup:

```javascript 
const game = Game();
const player1 = new Player('Player', 0, true);
const player2 = new Player('CPU', 1, false);
const cpu = new CPU(1, game.getGrid());
game.onGameOver(onGameOver);
game.start(player1, player2);

function onGameOver (victory: IVictory) {
  if (victory) {
      const message = victory.winner.name + ' win!!!';
      console.log(message);
  }
}

game.play(1, 1);
```
We have three basic objects here.

The player Player: 
```javascript 
const player1 = new Player('Player', 0, true);
```
This object constructor receives the player's name, the play (0 or 1 meaning X or O) and whether it will play first or not.

The CPU: 
```javascript 
const cpu = new CPU(1, game.getGrid());
const play = cpu.play();
game.play(play[0], play[1]);
```

The CPU it's our little robot to play along. The constructor takes the play (0 or 1)  and a grid object which is provided by the `game` object.
every time `cpu.play()` is called it will analyze the grid and give a guess.

The Game: 
```javascript 
const game = Game();
game.onGameOver(onGameOver);
game.start(player1, player2);
game.play(1, 1);

```

Game it's the main object. The function `this.game.start` takes two players and will reset the game every time it is called. `game.play` receives an XY coordinate and returns a Boolean indicating success.

Here's a full implementation example: https://github.com/williangaspar/react-tic-tac-toe

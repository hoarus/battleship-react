import React, {useState} from 'react';
import Board from '../GameBoard/Board';
import {GameBoard} from '../GameLogic/GameBoard';
import GameContext from '../Game/GameContext';
import PlaceShips from '../PlaceShips/PlaceShips';
import {Player} from '../GameLogic/Player';
import PlayerInputs from '../PlayerInputs/PlayerInputs';
import {Ship} from '../GameLogic/Ship';
import { createUseStyles } from 'react-jss';
import PlayerDetails from '../PlayerDetails/PlayerDetails';


const useStyles = createUseStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%'
  }
})



const togglePlayer = function (currentPlayer, pOne, pTwo) {
  if (currentPlayer == pOne) {
    currentPlayer = pTwo;
  } else {
    currentPlayer = pOne;
  }
}


const gameBoardOne = new GameBoard();
const gameBoardTwo = new GameBoard();
const playerOne = new Player();
const playerTwo = new Player();


const ships = {
  destroyer: (new Ship(2)),
  submarine: (new Ship(3)),
  cruiser: (new Ship(3)),
  battleship: (new Ship(4)),
  carrier: (new Ship(5)),
}


function Game() {
  const [players, setPlayers] = useState([]);
  const classes = useStyles();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []); 
  const gameState = {
    gameBoardOne: gameBoardOne,
    gameBoardTwo: gameBoardTwo,
    playerOne: playerOne,
    playerTwo: playerTwo,
    update: forceUpdate,
    players: players,
    setPlayers: setPlayers,
    currentPlayer: playerOne,
    togglePlayer: togglePlayer(playerOne, playerOne, playerTwo),
  }




  if (gameState.playerOne.name == "AI") {
    return (
      <GameContext.Provider value={gameState}>
        <div className={classes.gameWrapper}>
          <PlayerInputs/>
        </div>
      </GameContext.Provider>
    );
  } else {
    return(
      <GameContext.Provider value={gameState}>
        <div className={classes.gameWrapper}>
          <PlayerDetails/>
          <PlaceShips/>
          <Board/>
        </div>
      </GameContext.Provider>
    )
  }
}

export default Game;

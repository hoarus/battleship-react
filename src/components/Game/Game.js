import React, {useState} from 'react';
import Board from '../GameBoard/Board';
import {GameBoard} from '../GameLogic/GameBoard';
import GameContext from '../Game/GameContext';
import PlaceShips from '../PlaceShips/PlaceShips';

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

const gameBoard = new GameBoard();


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
    gameBoard: gameBoard,
    update: forceUpdate,
    players: players,
    setPlayers: setPlayers,
  }


  const playerOne = gameState.players[0];
  const playerTwo = gameState.players[1];

  if (gameState.players.length == 0) {
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

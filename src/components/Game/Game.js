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
import NextTurn from '../NextTurn/NextTurn';


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
playerOne.myGameBoard = gameBoardOne;
playerTwo.myGameBoard = gameBoardTwo;


const startingShips = {
  Destroyer: (new Ship(2)),
  Submarine: (new Ship(3)),
  Cruiser: (new Ship(3)),
  Battleship: (new Ship(4)),
  Carrier: (new Ship(5)),
}


function Game() {
  const [players, setPlayers] = useState([playerOne, playerTwo]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [ships, setShips] = useState(startingShips);
  const [selectedShip, selectShip] = useState(false);
  const [shipOrientation, setShipOrientation] = useState("x");
  const [turnOver, setTurnOver] = useState(false);
  const classes = useStyles();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []); 
  const gameState = {
    update: forceUpdate,
  }

      //Need to find some way to create a function in the context which enables toggling between players
    //Actually, maybe I don't. Maybe it only needs to be a single function which is passed down to a specific "Turn Over" button component
    //currentPlayer: playerOne,
    //togglePlayer: togglePlayer(playerOne, playerOne, playerTwo),




  if (players[0].name == "AI") {
    return (
      <GameContext.Provider value={gameState}>
        <div className={classes.gameWrapper}>
          <PlayerInputs players={players} setPlayers={setPlayers}/>
        </div>
      </GameContext.Provider>
    );
  } else if (turnOver==false) {
    return(
      <GameContext.Provider value={gameState}>
        <div className={classes.gameWrapper}>
          <PlayerDetails players={players}/>
          <PlaceShips 
            ships={ships} 
            setShips={setShips} 
            selectedShip={selectedShip}  
            selectShip={selectShip}
            shipOrientation={shipOrientation}
            setShipOrientation={setShipOrientation}
          />
          <Board 
            players={players} 
            setPlayers={setPlayers} 
            selectedShip={selectedShip} 
            selectShip={selectShip} 
            ships={ships} 
            setShips={setShips}
            shipOrientation={shipOrientation}
            setShipOrientation={setShipOrientation}
            turnOver = {turnOver}
            setTurnOver = {setTurnOver}
          />
        </div>
      </GameContext.Provider>
    )
  } else {
    return(
      <NextTurn
        players={players}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setTurnOver = {setTurnOver}
      />
    )
  }
}

export default Game;

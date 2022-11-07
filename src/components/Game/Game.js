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

const startingShips = {
  Destroyer: (new Ship(2)),
  Submarine: (new Ship(3)),
  Cruiser: (new Ship(3)),
  Battleship: (new Ship(4)),
  Carrier: (new Ship(5)),
}
const gameBoardOne = new GameBoard();
const gameBoardTwo = new GameBoard();
const playerOne = new Player();
const playerTwo = new Player();
playerOne.myGameBoard = gameBoardOne;
playerTwo.myGameBoard = gameBoardTwo;
playerOne.availableShips = startingShips;
playerTwo.availableShips = startingShips;





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
  const allShipsPlaced = function() {
    // No available ships remaining
    return Object.keys(currentPlayer.availableShips).length == 0;
  }


  



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
          <PlayerDetails players={players} currentPlayer={currentPlayer}/>
          {!allShipsPlaced() &&
          <PlaceShips 
            currentPlayer={currentPlayer}
            selectedShip={selectedShip}  
            selectShip={selectShip}
            shipOrientation={shipOrientation}
            setShipOrientation={setShipOrientation}
          />
          }
          {allShipsPlaced()&&
          <Board
            boardType="Opponent" 
            players={players} 
            setPlayers={setPlayers} 
            currentPlayer={currentPlayer}
            selectedShip={selectedShip} 
            selectShip={selectShip} 
            ships={ships} 
            setShips={setShips}
            shipOrientation={shipOrientation}
            setShipOrientation={setShipOrientation}
            turnOver = {turnOver}
            setTurnOver = {setTurnOver}
          />
          }
          <Board
            boardType="Own" 
            players={players} 
            setPlayers={setPlayers} 
            currentPlayer={currentPlayer}
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

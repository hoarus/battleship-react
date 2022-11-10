import React, {useState} from 'react';
import Board from '../GameBoard/Board';
import {GameBoard} from '../GameLogic/GameBoard';
import GameContext from '../Game/GameContext';
import GameOver from '../GameOver/GameOver';
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
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    padding: '5%',
    width: '100%',
  },
  additionalDetails: {
    width: '30%',
  }

})



const togglePlayer = function (currentPlayer, pOne, pTwo) {
  if (currentPlayer == pOne) {
    currentPlayer = pTwo;
  } else {
    currentPlayer = pOne;
  }
}

// Disabled Starting Ships
const disableStartingShips = {
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
playerOne.enemyGameBoard = gameBoardTwo;
playerTwo.enemyGameBoard = gameBoardOne;
//Ship assignment has to be duplicate to ensure players are not sharing a set of ships
playerOne.availableShips = {
  Destroyer: (new Ship(2)),
}
playerTwo.availableShips = {
  Destroyer: (new Ship(2)),
}





function Game() {
  const [players, setPlayers] = useState([playerOne, playerTwo]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [ships, setShips] = useState();
  const [selectedShip, selectShip] = useState(false);
  const [shipOrientation, setShipOrientation] = useState("x");
  const [turnOver, setTurnOver] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [shotTaken, setShotTaken] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [currentBoard, setCurrentBoard] = useState("My Board");
  const [shotResult, setShotResult] = useState("");
  const [mostRecentShot, setMostRecentShot] = useState("");
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
  const playerOneLost = function() {
    return (playerOne.myGameBoard.allShipsSunk() && (playerOne.myGameBoard.totalShips() > 0))
  }

  const playerTwoLost = function() {
    return (playerTwoLost.myGameBoard.allShipsSunk() && (playerOne.myGameBoard.totalShips() > 0))
  }

  const losingPlayer = () => playerOneLost()? playerOne : playerTwo

  const SelectedBoard = function(props){
    if (turnCount < 2 || currentBoard == "My Board") {
      return(
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
        turnCount = {turnCount}
        shotTaken = {shotTaken}
        setShotTaken = {setShotTaken}
        currentBoard = {currentBoard}
        setCurrentBoard = {setCurrentBoard}
        shotResult = {shotResult}
        setShotResult = {setShotResult}
        mostRecentShot = {mostRecentShot}
        setMostRecentShot = {setMostRecentShot}
      />
      )
    } else {
      return(
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
        turnCount = {turnCount}
        shotTaken = {shotTaken}
        setShotTaken = {setShotTaken}
        setGameOver = {setGameOver}
        currentBoard = {currentBoard}
        setCurrentBoard = {setCurrentBoard}
        shotResult = {shotResult}
        setShotResult = {setShotResult}
        mostRecentShot = {mostRecentShot}
        setMostRecentShot = {setMostRecentShot}
      />
      )
    }
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
        {gameOver&& 
        <GameOver/>
        }
        <div className={classes.gameWrapper}>
          <div className={classes.additionalDetails}>
            <PlayerDetails 
            players={players} 
            currentPlayer={currentPlayer} 
            turnCount={turnCount}
            shotResult = {shotResult}
            shotTaken = {shotTaken}
            setTurnOver = {setTurnOver}
          />
            {!allShipsPlaced() &&
            <PlaceShips 
              currentPlayer={currentPlayer}
              selectedShip={selectedShip}  
              selectShip={selectShip}
              shipOrientation={shipOrientation}
              setShipOrientation={setShipOrientation}
            />
            }
          </div>
        <SelectedBoard/>
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
        turnCount = {turnCount}
        setTurnCount = {setTurnCount}
        setShotTaken = {setShotTaken}
      />
    )
  }
}

export default Game;

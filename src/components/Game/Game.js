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
import ShotResult from '../ShotResult/ShotResult';
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
    padding: '0% 5%',
    width: '100%',
  },
  additionalDetails: {
    width: '30%',
  },
  playersTurn: {
    color: '#0E3744',
    padding: '0px',
    margin: '0px',
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
playerOne.enemyGameBoard = gameBoardTwo;
playerTwo.enemyGameBoard = gameBoardOne;
//Ship assignment has to be duplicate to ensure players are not sharing a set of ships
playerOne.availableShips = [
  new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)
]
playerTwo.availableShips = [
  new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)
]





function Game() {
  const [players, setPlayers] = useState([playerOne, playerTwo]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [selectedShip, selectShip] = useState({name: 'Destroyer', ship: (new Ship(2))});
  const [shipOrientation, setShipOrientation] = useState("x");
  const [turnOver, setTurnOver] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [shotTaken, setShotTaken] = useState();
  const [gameOver, setGameOver] = useState(false);
  const [currentBoard, setCurrentBoard] = useState("My Board")  ;
  const [shotResult, setShotResult] = useState("");
  const [mostRecentShot, setMostRecentShot] = useState("");
  const classes = useStyles();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []); 
  const gameState = {
    update: forceUpdate,
  }
  const endTurnConditionsMet = function() {
    if (turnCount <= 1 ) {
      // No available ships remaining
      return (Object.keys(currentPlayer.availableShips).length == 0);
    } else {
      return (shotTaken);
    }
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
        <h1 className={classes.playersTurn}>Sam's Turn</h1>
        {gameOver&& 
        <GameOver/>
        }
        <div className={classes.gameWrapper}>
        {endTurnConditionsMet() &&
            <ShotResult 
            players={players} 
            currentPlayer={currentPlayer} 
            turnCount={turnCount}
            shotResult = {shotResult}
            shotTaken = {shotTaken}
            setTurnOver = {setTurnOver}
          />
        }
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
        selectShip = {selectShip}
      />
    )
  }
}

export default Game;

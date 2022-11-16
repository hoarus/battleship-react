import React, {useState} from 'react';
import Board from '../GameBoard/Board';
import {GameBoard} from '../GameLogic/GameBoard';
import GameContext from '../Game/GameContext';
import GameOver from '../GameOver/GameOver';
import RotateShips from '../RotateShips/Rotate Ships';
import {Player} from '../GameLogic/Player';
import PlayerInputs from '../PlayerInputs/PlayerInputs';
import {Ship} from '../GameLogic/Ship';
import { createUseStyles } from 'react-jss';
import ShotResult from '../ShotResult/ShotResult';
import NextTurn from '../NextTurn/NextTurn';

const useStyles = createUseStyles({
  gameWrapper: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0% 5%',
    width: '100%',
    maxWidth: '700px',
  },
  playersTurn: {
    color: '#0E3744',
    padding: '0px',
    margin: '0px',
  }
})


// Create all GameLogic components
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
  new Ship(2), 
]

export default function Game() {
  const [players, setPlayers] = useState([playerOne, playerTwo]);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [selectedShip, selectShip] = useState();
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
  const commonBoardProps = {
    players: players,
    setPlayers: setPlayers,
    currentPlayer: currentPlayer,
    selectedShip: selectedShip,
    selectShip: selectShip,
    shipOrientation: shipOrientation,
    turnCount: turnCount,
    shotTaken: shotTaken,
    setShotTaken: setShotTaken,
    currentBoard: currentBoard,
    setCurrentBoard: setCurrentBoard,
    setShotResult: setShotResult,
    mostRecentShot: mostRecentShot,
    setMostRecentShot: setMostRecentShot,
    setGameOver: setGameOver,
  };

  const endTurnConditionsMet = function() {
    if (turnCount <= 1 ) { // Test if no available ships remaining
      return (Object.keys(currentPlayer.availableShips).length === 0);
    } else { // Test if shotTaken
      return (shotTaken);
    }
  }

  const SelectedBoard = function(){
    if (turnCount < 2 || currentBoard === "My Board") {
      return(
        <Board
          boardType="Own" 
          {...commonBoardProps}
        />
      )
    } else {
      return(
        <Board
          boardType="Opponent" 
          {...commonBoardProps}
        />
      )
    }
  }

  // If players have not been created, remain on Player Inputs screen
  if (players[0].name === "AI") {
    return (
      <div className={classes.gameWrapper}>
        <PlayerInputs players={players} setPlayers={setPlayers}/>
      </div>
    );
  } else if (turnOver===false) { // If turn is not over, render main game
    return(
      <GameContext.Provider value={gameState}>
        <h1 className={classes.playersTurn}>{currentPlayer.name}'s Turn</h1>
        <div className={classes.gameWrapper}>
          {turnCount <=1 && // Only render Rotate Ships button if during place ships phase of game
            <RotateShips
              shipOrientation = {shipOrientation}
              setShipOrientation = {setShipOrientation}
            />
          }
          <SelectedBoard/>
        </div>
        {endTurnConditionsMet() && // Only render Shot Result is turn over
          <ShotResult 
            players={players} 
            currentPlayer={currentPlayer} 
            turnCount={turnCount}
            shotResult = {shotResult}
            shotTaken = {shotTaken}
            setTurnOver = {setTurnOver}
          />
        }
      </GameContext.Provider>
    )
  } else if (gameOver){ // Render Game Over
    return(
    <GameOver
      currentPlayer={currentPlayer}
    />
    )
  } else { // Proceed to next turn
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


import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import GameSquare from '../GameSquare/GameSquare';
import OpponentGameSquare from '../OpponentGameSquare/OpponentGameSquare'
import BoardTab from '../BoardTab/BoardTab'

const incrementLetter = function(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i)
}

const useStyles = createUseStyles({

  wrapper: {
    boxSizing:'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    maxHeight: '70vh',
  },
  boardWrapper: {
    width:'40%',
    
  },
  gameBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    border: 'solid 2px darkblue',
    width: '100%',
    
  },
  button: {
    flexGrow: '0',
    padding: '0.2rem 2rem',
  }
})


function Board(props) {
  const boardType = props.boardType;
  const players = props.players;
  const currentPlayer = props.currentPlayer
  const setPlayers = props.setPlayers;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const setTurnOver = props.setTurnOver;
  const ships = props.ships
  const setShips = props.setShips
  const shipOrientation = props.shipOrientation
  const setShipOrientation = props.setShipOrientation
  const classes = useStyles();
  const gameBoard = currentPlayer.myGameBoard;
  const shotTaken = props.shotTaken;
  const setShotTaken = props.setShotTaken;
  const setGameOver = props.setGameOver;
  const turnCount = props.turnCount;
  const [shotResult, setShotResult] = useState("");
  const currentBoard = props.currentBoard;
  const setCurrentBoard = props.setCurrentBoard;


  const endTurn = function() {
    setTurnOver();
  }

  const endTurnConditionsMet = function() {
    if (turnCount <= 1 ) {
      // No available ships remaining
      return (Object.keys(currentPlayer.availableShips).length == 0);
    } else {
      return (shotTaken);
    }
  }

  const ApplicableSquareType = function(props){
    const square = props.square;
    const x = props.x;
    const y = props.y
    if(boardType == "Own") {
      return(
        <GameSquare 
        key={`own[${x}:${y}]`} 
        value={square} 
        position={`${incrementLetter(x)}${y + 1}`} 
        players={players} 
        currentPlayer = {currentPlayer}
        setPlayers={setPlayers} 
        selectedShip={selectedShip} 
        selectShip={selectShip}
        ships={ships}
        setShips={setShips}
        shipOrientation={shipOrientation}
        setShipOrientation={setShipOrientation}
      /> 
      )
    } else {
      return(
        <OpponentGameSquare
        key={`opponent[${x}:${y}]`} 
        value={square} 
        position={`${incrementLetter(x)}${y + 1}`} 
        players={players} 
        currentPlayer = {currentPlayer}
        setPlayers={setPlayers} 
        selectedShip={selectedShip} 
        selectShip={selectShip}
        ships={ships}
        setShips={setShips}
        shipOrientation={shipOrientation}
        setShipOrientation={setShipOrientation}
        shotTaken = {shotTaken}
        setShotTaken={setShotTaken}
        setShotResult={setShotResult}
        setGameOver = {setGameOver}
      /> 
      )
    }
  }

  return(
    <div className={classes.wrapper}>
        {(boardType=="Opponent") &&
        <div>Shot Result: {shotResult}</div>
        }
        <div className={classes.boardWrapper}>
        {(turnCount > 1) &&
          <BoardTab
            currentBoard = {currentBoard}
            setCurrentBoard = { setCurrentBoard }
          />
        }
          <div className= {classes.gameBoard}>
            {gameBoard.board.map((row, y) =>
              row.map((square, x) =>
              <ApplicableSquareType key={x} square={square} x={x} y={y} /> 
              )) }
          </div>
        </div>
        {endTurnConditionsMet() &&
          <button className={classes.button} onClick={endTurn}>End Turn</button>
        }
    </div>
  )
}

export default Board;
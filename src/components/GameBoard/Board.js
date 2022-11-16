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
    padding: '7% 2%',
    width: '90%'
  },
  boardWrapper: {
    width: '100%',
    
  },
  gameBoard: {
    boxSizing: 'border-box',
    flex: '2 1 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    border: 'solid 2px #0E3744',
    width: '100%',
    maxHeight: '50vh',
    
  },
  button: {
    flexGrow: '0',
    padding: '0.2rem 1rem',
  }
})


function Board(props) {
  const classes = useStyles();
  const boardType = props.boardType;
  const players = props.players;
  const currentPlayer = props.currentPlayer
  const setPlayers = props.setPlayers;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const shipOrientation = props.shipOrientation
  const gameBoard = currentPlayer.myGameBoard;
  const shotTaken = props.shotTaken;
  const setShotTaken = props.setShotTaken;
  const setGameOver = props.setGameOver;
  const turnCount = props.turnCount;
  const setShotResult = props.setShotResult;
  const currentBoard = props.currentBoard;
  const setCurrentBoard = props.setCurrentBoard;
  const mostRecentShot = props.mostRecentShot
  const setMostRecentShot = props.setMostRecentShot;
  const [highlightedShipSquares, setHighlightedShipSquares] = useState([]);



  const ApplicableSquareType = function(props){
    const x = props.x;
    const y = props.y
    if(boardType == "Own") {
      return(
        <GameSquare 
        key={`own[${x}:${y}]`} 
        position={`${incrementLetter(x)}${y + 1}`} 
        players={players} 
        currentPlayer = {currentPlayer}
        setPlayers={setPlayers} 
        selectedShip={selectedShip} 
        selectShip={selectShip}
        shipOrientation={shipOrientation}
        mostRecentShot = {mostRecentShot}
        highlightedShipSquares = {highlightedShipSquares}
        setHighlightedShipSquares = {setHighlightedShipSquares}
      /> 
      )
    } else {
      return(
        <OpponentGameSquare
        key={`opponent[${x}:${y}]`} 
        position={`${incrementLetter(x)}${y + 1}`} 
        currentPlayer = {currentPlayer}
        shotTaken = {shotTaken}
        setShotTaken={setShotTaken}
        setShotResult={setShotResult}
        setGameOver = {setGameOver}
        mostRecentShot = {mostRecentShot}
        setMostRecentShot = {setMostRecentShot}
      /> 
      )
    }
  }

  return(
    <div className={classes.wrapper}>
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
              <ApplicableSquareType key={x} x={x} y={y} /> 
              )) }
          </div>
        </div>
    </div>
  )
}

export default Board;
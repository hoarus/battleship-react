import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import GameSquare from '../GameSquare/GameSquare';

const incrementLetter = function(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i)
}

const useStyles = createUseStyles({
  gameBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    border: 'solid 2px darkblue',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    flexGrow: 0,
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

  const endTurn = function() {
    setTurnOver();
  }

  const endTurnConditionsMet = function() {
    // No available ships remaining
    return Object.keys(currentPlayer.availableShips).length == 0;
  }
  let boardTitle = "";
  if (boardType == "Own") {
    boardTitle ="Your Board";
   } else {
    boardTitle = "Opponent's Board";
   }

  const ApplicableSquareType = function(){

  }

  return(
    <div className={classes.wrapper}>
        <h2>{boardTitle}</h2>
        <div className= {classes.gameBoard}>
          {gameBoard.board.map((row, y) =>
            row.map((square, x) =>
            <GameSquare 
              key={x} 
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
            )) }
        </div>
        {endTurnConditionsMet() &&
          <button className={classes.button} onClick={endTurn}>End Turn</button>
        }
    </div>
  )
}

export default Board;
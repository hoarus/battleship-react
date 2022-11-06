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
  const players = props.players;
  const setPlayers = props.setPlayers;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const playerOne = props.players[0];
  const playerTwo = props.players[1];
  const setTurnOver = props.setTurnOver;


  const classes = useStyles();
  const gameBoard = playerOne.myGameBoard;

  const endTurn = function() {
    setTurnOver();
  }

  return(
    <div className={classes.wrapper}>
        <div className= {classes.gameBoard}>
          {gameBoard.board.map((row, y) =>
            row.map((square, x) =>
            <GameSquare 
              key={x} 
              value={square} 
              position={`${incrementLetter(x)}${y + 1}`} 
              players={players} 
              setPlayers={setPlayers} 
              selectedShip={selectedShip} 
              selectShip={selectShip}
              ships={props.ships} 
              setShips={props.setShips}
              shipOrientation={props.shipOrientation}
              setShipOrientation={props.setShipOrientation}
            /> 
            )) }
        </div>
        <button className={classes.button} onClick={endTurn}>End Turn</button>
    </div>
  )
}

export default Board;
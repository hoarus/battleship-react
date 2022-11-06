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
    justifyContent: 'center',
  }
})


function Board(props) {
  const players = props.players;
  const setPlayers = props.setPlayers;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const playerOne = props.players[0];
  const playerTwo = props.players[1];


  const classes = useStyles();
  const gameBoard = playerOne.myGameBoard;

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
            /> 
            )) }
        </div>
    </div>
  )
}

export default Board;
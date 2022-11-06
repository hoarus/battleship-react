import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import GameContext from '../Game/GameContext';
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



function Board() {
  const classes = useStyles();
  const gameState = useContext(GameContext);
  const gameBoard = gameState.gameBoardOne

  return(
    <div className={classes.wrapper}>
        <div className= {classes.gameBoard}>
          {gameBoard.board.map((row, y) =>
            row.map((square, x) =>
            <GameSquare key={x} value={square} position={`${incrementLetter(x)}${y + 1}`}/> 
            )) }
        </div>
    </div>
  )
}

export default Board;
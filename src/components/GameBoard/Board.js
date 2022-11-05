import React, { createContext } from 'react';
import GameSquare from '../GameSquare/GameSquare';
import { createUseStyles } from 'react-jss';
import {GameBoard} from './GameBoard';
import GameContext from './GameContext';


const useStyles = createUseStyles({
  gameBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    border: 'solid 2px darkblue',
    width: '80%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  }
})

const incrementLetter = function(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i)
}


function Board() {

  const classes = useStyles();
  const gameBoard = new GameBoard();
  console.log(gameBoard.board);
  
  return(
    <div className={classes.wrapper}>
      <GameContext.Provider value={gameBoard}>
        <div className= {classes.gameBoard}>
          {gameBoard.board.map((row, y) =>
            row.map((square, x) =>
            <GameSquare key={x} value={square} position={`${incrementLetter(x)}${y + 1}`}/> 
            )) }
        </div>
      </GameContext.Provider>
    </div>
  )
}

export default Board;
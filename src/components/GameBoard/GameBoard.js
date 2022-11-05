import React from 'react';
import GameSquare from '../GameSquare/GameSquare';
import { createUseStyles } from 'react-jss';
import {GameBoard} from './GameBoardLogic';

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



function Board() {

  const classes = useStyles();
  const gameBoard = new GameBoard();


  return(
    <div className={classes.wrapper}>
      <div className= {classes.gameBoard}>
        {gameBoard.board.map((row) =>
          row.map((square, index) =>
          <GameSquare key={index}/> 
          )) }
      </div>
    </div>
  )
}

export default Board;
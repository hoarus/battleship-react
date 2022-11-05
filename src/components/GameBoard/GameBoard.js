import React from 'react';
import GameSquare from '../GameSquare/GameSquare';
import { createUseStyles } from 'react-jss';

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


function GameBoard() {

  const classes = useStyles();

  return(
    <div className={classes.wrapper}>
      <div className= {classes.gameBoard}>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
        <GameSquare/>
      </div>
    </div>
  )
}

export default GameBoard;
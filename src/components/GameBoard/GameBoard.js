import React from 'react';
import GameSquare from '../GameSquare/GameSquare';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameBoard: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    border: 'solid 2px black',
    width: '80%',
    height: '80%',
  }
})


function GameBoard() {

  const classes = useStyles();

  return(

    <div>
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
  )
}

export default GameBoard;
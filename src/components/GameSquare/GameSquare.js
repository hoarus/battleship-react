import React, { useContext } from 'react';
import GameContext from '../GameBoard/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameBoard/ship';

const useStyles = createUseStyles({
  gameSquare: {
    border: 'solid 1px darkblue',
    backgroundColor: 'lightgreen',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
    '&:hover': {
      backgroundColor: 'pink'
    },
  },
  gameSquare2: {
    border: 'solid 1px darkblue',
    backgroundColor: 'orange',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
  }
})



function GameSquare(props) {
  const classes = useStyles();
  const gameBoard = useContext(GameContext);
  const placeShip = function() {
    gameBoard.placeShip(smallShip, props.position, "x");
  }
  const squareType = gameBoard.lookupPosition(props.position);
  const smallShip = new Ship(2);
  if(squareType === 0) {
    return(
      <div className={classes.gameSquare} onClick = {placeShip}>{squareType}</div>
    );
  } else {
    return(
      <div className={classes.gameSquare2} onClick = {placeShip}>{props.position}</div>
    );
  }
  


}

export default GameSquare;
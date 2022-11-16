import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameSquare: {
    boxSizing: 'border-box',
    border: 'outset 3px #A8BDC5',
    backgroundColor: '#A8BDC5',
    color: 'blue',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
    '&:hover': {
      backgroundColor: '#d24531',
      borderColor: '#d24531',
    },
  }, shipSquare: {
    backgroundColor: '#FBA346',
    border: 'outset 3px #FBA346',
  },
  missSquare: {
    border: 'outset 3px #0E3744',
    backgroundColor: '#0E3744',
  },
})



function OpponentGameSquare(props) {
  const classes = useStyles();
  const gameState = useContext(GameContext);
  const currentPlayer = props.currentPlayer;
  const position = props.position;
  const setShotTaken = props.setShotTaken;
  const shotTaken = props.shotTaken;
  const setShotResult = props.setShotResult;
  const setGameOver = props.setGameOver;
  const setMostRecentShot = props.setMostRecentShot;
  const enemyGameBoard = currentPlayer.enemyGameBoard;
  const squareType =  () => enemyGameBoard.lookupPosition(props.position);

  const shotResult = function(target){
    if (target == 0) {
      return "Miss!"
    } else if (target.health > 0) {
      return "Hit!"
    } else if (target.health == 0) {
      return "Sunk!"
    } else {
      return "Error!"
    }
  }

  const fireShot = function(){
    if (shotTaken) {
      return
    }
    setShotResult(shotResult(currentPlayer.fireShot(position)));
    setMostRecentShot(position);
    setShotTaken(true);
    if(currentPlayer.enemyGameBoard.allShipsSunk() == true) {
      setGameOver(true);
    }
    gameState.update();
  }

  // square is a miss
  if(squareType() === 1) {
    return(
      <div className={`${classes.gameSquare} ${classes.missSquare}`}></div>
    );
  } else if(squareType()==2) {
    return(<div className={`${classes.gameSquare} ${classes.shipSquare}`} onClick = {fireShot}></div>)
  } else {
    return(
      <div className={classes.gameSquare} onClick = {fireShot}></div>
    );
  }
  


}

export default OpponentGameSquare;
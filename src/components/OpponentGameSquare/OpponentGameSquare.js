import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameSquare: {
    border: 'outset 3px gray',
    backgroundColor: 'gray',
    color: 'blue',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
    '&:hover': {
      backgroundColor: 'pink',
      borderColor: 'pink',
    },
  }, shipSquare: {
    backgroundColor: 'orange',
    border: 'outset 3px orange',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
  },
  missSquare: {
    border: 'outset 3px blue',
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
  },
})



function OpponentGameSquare(props) {
  const classes = useStyles();
  const currentPlayer = props.currentPlayer;
  const players = props.players;
  const selectedShip = props.selectedShip;
  const gameState = useContext(GameContext);
  const enemyGameBoard = currentPlayer.enemyGameBoard;
  const position = props.position;
  const inactiveSquare = false;
  const squareType =  () => enemyGameBoard.lookupPosition(props.position);
  const setShotTaken = props.setShotTaken;
  const shotTaken = props.shotTaken;
  const setShotResult = props.setShotResult;
  const setGameOver = props.setGameOver;
  const mostRecentShot = props.mostRecentShot
  const setMostRecentShot = props.setMostRecentShot

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
      <div className={classes.missSquare}>{props.position}</div>
    );
  } else if(squareType()==2) {
    return(<div className={classes.shipSquare} onClick = {fireShot}></div>)
  } else {
    return(
      <div className={classes.gameSquare} onClick = {fireShot}></div>
    );
  }
  


}

export default OpponentGameSquare;
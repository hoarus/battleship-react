import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameSquare: {
    boxSizing: 'border-box',
    border: 'outset 3px #CCE8E6',
    backgroundColor: '#A8BDC5',
    color: 'blue',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
  }, 
  shipSquare: {
    backgroundColor: '#FBA346',
  },
  missSquare: {
    backgroundColor: '#0E3744',
  },
  playerSquare: {
    '&:hover': {
      backgroundColor: '#d24531',
    },
  }
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
    if (target === 0) {
      return "Miss!"
    } else if (target.health > 0) {
      return "Hit!"
    } else if (target.health === 0) {
      return "Sunk!"
    } else {
      return "Error!"
    }
  }

  const fireShot = function(){
    if (shotTaken || currentPlayer.name === "AI") {
      return
    }
    setShotResult(shotResult(currentPlayer.fireShot(position)));
    setMostRecentShot(position);
    setShotTaken(true);
    if(currentPlayer.enemyGameBoard.allShipsSunk() === true) {
      setGameOver(true);
    }
    gameState.update();
  }
  
  const isPlayer = () => currentPlayer.name !== "AI";

  // square is a miss
  if(squareType() === 1) {
    return(
      <div className={`${classes.gameSquare} ${classes.missSquare} ${isPlayer() ? classes.playerSquare : ''}`}></div>
    );
  } else if(squareType()===2) {
    return(<div className={`${classes.gameSquare} ${classes.shipSquare} ${isPlayer() ? classes.playerSquare : ''}`}></div>)
  } else {
    return(
      <div className={` ${classes.gameSquare} ${isPlayer() ? classes.playerSquare : ''} `} onClick = {fireShot}></div>
    );
  }
  


}

export default OpponentGameSquare;
import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameSquare: {
    boxSizing: 'border-box',
    border: 'solid 1px white',
    backgroundColor: '#121212',
    color: 'blue',
    overflow: 'hidden',
    overflowX: 'hidden',
    overflowY: 'hidden',
    aspectRatio: '1/1',
    alignItems: 'center',
    justifyContent: 'center',
    width: '4vh',
    height: '4vh',
    minWidth: '0',
    minHeight: '0',
    maxWidth: '100%',
    maxHeight: '100%',
    '@media (min-width: 400px)': {
      width: '6vh',
      height: '6vh',
    }
  }, 
  shipSquare: {
    backgroundColor: '#ffc600',
  },
  missSquare: {
    backgroundColor: '#8EB1C7',
  },
  playerSquare: {
    '&:hover': {
      backgroundColor: '#C32F27',
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
import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameSquare: {
    border: 'solid 1px darkblue',
    backgroundColor: 'gray',
    color: 'blue',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
    '&:hover': {
      backgroundColor: 'pink'
    },
  }, inactiveSquare: {
    border: 'solid 1px darkblue',
    backgroundColor: 'lightgreen',
    color: 'black',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
  },
  shipSquare: {
    border: 'solid 1px darkblue',
    backgroundColor: 'orange',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
  },
  missSquare: {
    border: 'solid 1px darkblue',
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

  const shotResult = function(target){
    console.log(target);
    console.log(target.health);

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
    setShotTaken(true);
    gameState.update();
  }

  // square is a miss
  if(squareType() === 1) {
    return(
      <div className={classes.missSquare}>{props.position}</div>
    );
  } else if(squareType()==2) {
    return(<div className={classes.shipSquare} onClick = {fireShot}>{props.position}</div>)
  } else {
    return(
      <div className={classes.gameSquare} onClick = {fireShot}>{props.position}</div>
    );
  }
  


}

export default OpponentGameSquare;
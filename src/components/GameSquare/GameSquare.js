import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';

const useStyles = createUseStyles({
  gameSquare: {
    border: 'solid 1px darkblue',
    backgroundColor: 'lightgreen',
    color: 'black',
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
  const players = props.players;
  const setPlayers = props.setPlayers;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const gameState = useContext(GameContext);
  const currentPlayer = players[0];
  const myGameBoard = currentPlayer.myGameBoard;


  const placeShip = function() {
    console.log(selectedShip);
    myGameBoard.placeShip(smallShip, props.position, "y");
    setPlayers(players);
    gameState.update();
  }
  const squareType =  () => myGameBoard.lookupPosition(props.position);
  const smallShip = selectedShip;

  if(squareType() === 0) {
    return(
      <div className={classes.gameSquare} onClick = {placeShip}>{props.position}</div>
    );
  } else {
    return(
      <div className={classes.gameSquare2} onClick = {placeShip}>{props.position}</div>
    );
  }
  


}

export default GameSquare;
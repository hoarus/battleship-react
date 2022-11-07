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
  const currentPlayer = props.currentPlayer;
  const players = props.players;
  const setPlayers = props.setPlayers;
  const ships = currentPlayer.availableShips;
  const setShips = props.setShips;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const gameState = useContext(GameContext);
  const myGameBoard = currentPlayer.myGameBoard;
  const shipOrientation = props.shipOrientation;
  const position = props.position;

  
  const removePlacedShip = function() {
    const updatedShips = {    }
    for (const shipName in ships) {
      if (shipName != selectedShip.name)
      updatedShips[shipName] = ships[shipName];
    }
    currentPlayer.availableShips = updatedShips;
  }


  const placeShip = function() {
    if (selectedShip == false) {return} 
    myGameBoard.placeShip(ship, position, shipOrientation);
    setPlayers(players);
    gameState.update();
    // Update Ships
    removePlacedShip();    
    // Prevent ship being placed twice
    selectShip(false);
  }
  const squareType =  () => myGameBoard.lookupPosition(props.position);
  const ship = selectedShip.ship;

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
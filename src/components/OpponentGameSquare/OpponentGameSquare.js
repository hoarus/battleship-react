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
  const setPlayers = props.setPlayers;
  const ships = currentPlayer.availableShips;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const gameState = useContext(GameContext);
  const enemyGameBoard = currentPlayer.enemyGameBoard;
  const shipOrientation = props.shipOrientation;
  const position = props.position;
  const inactiveSquare = false;
  const squareType =  () => enemyGameBoard.lookupPosition(props.position);
  const ship = selectedShip.ship;

  const enemyPlayer = function(){
    if (currentPlayer == players[0]){
      return players[1]
    } else {
      return players[0]
    }
  }
  
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
    else if (enemyGameBoard.placeShip(ship, position, shipOrientation) != "Illegal Move") {
      setPlayers(players);
      gameState.update();
      // Update Ships
      removePlacedShip();    
      // Prevent ship being placed twice
      selectShip(false);
    }
  }

  const fireShot = function(){
    console.log("fired");
    console.log(currentPlayer.fireShot(position));
    gameState.update();
    console.log(squareType());
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
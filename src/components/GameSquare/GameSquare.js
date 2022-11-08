import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';

const useStyles = createUseStyles({
  gameSquare: {
    border: 'solid 1px darkblue',
    display: 'flex',
    color: 'black',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSquare: {
    backgroundColor: 'lightgreen',
    '&:hover': {
      backgroundColor: 'pink'
    },
  }, 
  inactiveSquare: {
    backgroundColor: 'lightgreen',
  },
  shipSquare: {
    backgroundColor: 'orange',
  }, 
  miss: {
    border: 'solid 1px darkblue',
    backgroundColor: 'white',
    borderRadius: '50%',
    width: '80%',
    aspectRatio: '1/1',
  },
  hit: {
    border: 'solid 1px darkblue',
    backgroundColor: 'red',
    borderRadius: '50%',
    width: '80%',
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
  const inactiveSquare = () => Object.keys(currentPlayer.availableShips).length == 0;
  const squareType =  () => myGameBoard.lookupPosition(props.position);
  const ship = selectedShip.ship;
  
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
    else if (myGameBoard.placeShip(ship, position, shipOrientation) != "Illegal Move") {
      setPlayers(players);
      gameState.update();
      // Update Ships
      removePlacedShip();    
      // Prevent ship being placed twice
      selectShip(false);
    }
  }

  if(typeof squareType() == "object") /*ship*/{
    return(
      <div className={`${classes.gameSquare} ${classes.shipSquare}`}>{props.position}</div>
    );
  } else if(squareType()=== 1) /*miss*/{
    return(
    <div className={`${classes.gameSquare} ${classes.inactiveSquare}`}>
      <div className={classes.miss}></div>
    </div>
    )
  } else if(squareType()=== 2)/*hit*/{
    return(
    <div className={`${classes.gameSquare} ${classes.shipSquare}`}>
      <div className={classes.hit}></div>
    </div>
    )
  } else if (inactiveSquare()){
    return(
      <div className={`${classes.gameSquare} ${classes.inactiveSquare}`}>{props.position}</div>
    )
  } else if (squareType() === 0) {
    return(
      <div className={`${classes.gameSquare} ${classes.activeSquare}`} onClick = {placeShip}>{props.position}</div>
    );
    } else {
    return(
      <div>Error</div>
    );
  }
  


}

export default GameSquare;
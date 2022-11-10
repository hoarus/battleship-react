import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';

const useStyles = createUseStyles({
  gameSquare: {
    border: 'outset 3px lightgreen',
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
    borderColor: 'lightgreen',
    '&:hover': {
      backgroundColor: 'pink',
      borderColor: 'pink',
    },
  }, 
  inactiveSquare: {
    backgroundColor: 'lightgreen',
    borderColor: 'lightgreen',
  },
  shipSquare: {
    backgroundColor: 'orange',
    borderColor: 'orange',
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
  },
  '@keyframes blinkMiss': {
    from: {
      backgroundColor: 'white',
    },
    to: {
      backgroundColor: 'pink'
    }
  },
  '@keyframes blinkHit': {
    from: {
      backgroundColor: 'red',
    },
    to: {
      backgroundColor: 'pink'
    }
  },
  blinkingMiss: {
    animationName: '$blinkMiss',
    animationDuration: '0.3s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate-reverse',
    animationTimingFunction: 'linear',
  },
  blinkingHit: {
    animationName: '$blinkHit',
    animationDuration: '0.3s',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate-reverse',
    animationTimingFunction: 'linear',
  },
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
  const mostRecentShot = props.mostRecentShot
  const setMostRecentShot = props.setMostRecentShot
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
      <div className={`${classes.gameSquare} ${classes.shipSquare}`}></div>
    );
  } else if(squareType()=== 1) /*miss*/{
    return(
    <div className={`${classes.gameSquare} ${classes.inactiveSquare}`}>
      {mostRecentShot == position && 
        <div className={`${classes.miss}  ${classes.blinkingMiss}`}></div>
      }
      {mostRecentShot != position && 
        <div className={`${classes.miss}`}></div>
      }
    </div>
    )
  } else if(squareType()=== 2)/*hit*/{
    return(
      <div className={`${classes.gameSquare} ${classes.shipSquare}`}>
      {mostRecentShot == position && 
        <div className={`${classes.hit}  ${classes.blinkingHit}`}></div>
      }
      {mostRecentShot != position && 
        <div className={`${classes.hit}`}></div>
      }
    </div>
    )
  } else if (inactiveSquare()){
    return(
      <div className={`${classes.gameSquare} ${classes.inactiveSquare}`}></div>
    )
  } else if (squareType() === 0) {
    return(
      <div className={`${classes.gameSquare} ${classes.activeSquare}`} onClick = {placeShip}></div>
    );
    } else {
    return(
      <div>Error</div>
    );
  }
  


}

export default GameSquare;
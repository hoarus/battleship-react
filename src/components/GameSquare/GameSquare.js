import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';

const useStyles = createUseStyles({
  gameSquare: {
    boxSizing: 'border-box',
    border: 'outset 3px lightgreen',
    display: 'flex',
    color: 'black',
    width: '100%',
    height: '100%',
    aspectRatio: '1/1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSquare: {
    backgroundColor: '#0E3744',
    borderColor: '#0E3744',
    '&:hover': {
      backgroundColor: '#d24531',
      borderColor: '#d24531',
    },
  },
  highlightedSquare: {
    backgroundColor: '#d24531',
    borderColor: '#d24531',
  },
  inactiveSquare: {
    backgroundColor: '#0E3744',
    borderColor: '#0E3744',
  },
  shipSquare: {
    backgroundColor: '#FBA346',
    borderColor: '#FBA346',
  }, 
  miss: {
    color: 'transparent',
    textShadow: '0 0 0 #d24531',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
  },
  hit: {
    color: 'transparent',
    textShadow: '0 0 0 #d24531',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
  },
  '@keyframes blinkMiss': {
    from: {
      textShadow: '0 0 0 #d24531',
    },
    to: {
      textShadow: '0 0 0 #0E3744',
    }
  },
  '@keyframes blinkHit': {
    from: {
      textShadow: '0 0 0 #d24531',
    },
    to: {
      textShadow: '0 0 0 #FBA346',
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
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const gameState = useContext(GameContext);
  const myGameBoard = currentPlayer.myGameBoard;
  const shipOrientation = props.shipOrientation;
  const position = props.position;
  const mostRecentShot = props.mostRecentShot
  const setMostRecentShot = props.setMostRecentShot
  const highlightedShipSquares = props.highlightedShipSquares;
  const setHighlightedShipSquares = props.setHighlightedShipSquares;
  const inactiveSquare = () => Object.keys(currentPlayer.availableShips).length == 0;
  const squareType =  () => myGameBoard.lookupPosition(props.position);
  const ship = currentPlayer.availableShips[0];

   
  const removePlacedShip = function() {
    const updatedShips = currentPlayer.availableShips.slice(1);
    currentPlayer.availableShips = updatedShips;
  }


  const placeShip = function() {
    if (selectedShip == false) {return} 
    else if (myGameBoard.placeShip(ship, position, shipOrientation) != "Illegal Move") {
      setPlayers(players);
      gameState.update();
      // Update Ships
      removePlacedShip();    
      // Load next ship, setting to false if all ships placed
      if (currentPlayer.availableShips.length == 0) {
        selectShip(false);
      } else {
        selectShip(currentPlayer.availableShips[0]);
      }
    }
  }

  const getYHighlightCoordinates = function() {
    let yHighlightCoordinates = [];
    for (let i = 0; i < ship.length; i++) {
      let y = Number(position.slice(1)) + i;
      let coordinates = position[0].concat(y);
      yHighlightCoordinates.push(coordinates);
    }
    return yHighlightCoordinates;
  }

  const getXHighlightCoordinates = function() {
    let xHighlightCoordinates = [];
    for (let i = 0; i < ship.length; i++) {
      let x = Number(position.slice(1));
      let y = String.fromCharCode(position.charCodeAt(0) + i);
      let coordinates = y.concat(x);
      xHighlightCoordinates.push(coordinates);
    }
    return xHighlightCoordinates;
  }

  const highlightSquares = function() {
    if (shipOrientation=="x") {
      setHighlightedShipSquares(getXHighlightCoordinates());
    } else {
      setHighlightedShipSquares(getYHighlightCoordinates());
    }
    
  }

  const unHighlightSquares = () => setHighlightedShipSquares([]);


  if(typeof squareType() == "object") /*ship*/{
    return(
      <div className={`${classes.gameSquare} ${classes.shipSquare}`}></div>
    );
  } else if(squareType()=== 1) /*miss*/{
    return(
    <div className={`${classes.gameSquare} ${classes.inactiveSquare}`}>
      {mostRecentShot == position && 
        <div className={`${classes.miss}  ${classes.blinkingMiss}`}>❌</div>
      }
      {mostRecentShot != position && 
        <div className={`${classes.miss}`}>❌</div>
      }
    </div>
    )
  } else if(squareType()=== 2)/*hit*/{
    return(
      <div className={`${classes.gameSquare} ${classes.shipSquare}`}>
      {mostRecentShot == position && 
        <div className={`${classes.hit}  ${classes.blinkingHit}`}>❌</div>
      }
      {mostRecentShot != position && 
        <div className={`${classes.hit}`}>❌</div>
      }
    </div>
    )
  } else if (inactiveSquare()){
    return(
      <div className={`${classes.gameSquare} ${classes.inactiveSquare}`}></div>
    )
  } else if (squareType() === 0 && highlightedShipSquares.includes(position)) {
      return(
        <div className={`${classes.gameSquare} ${classes.activeSquare} ${classes.highlightedSquare}`} onClick = {placeShip} ></div>
      );
    } else if (squareType() === 0) {
      return(
        <div className={`${classes.gameSquare} ${classes.activeSquare}`} onClick = {() => placeShip()} onMouseEnter = {highlightSquares}></div>
      );
    } else {
    return(
      <div>Error</div>
    );
  }
  


}

export default GameSquare;
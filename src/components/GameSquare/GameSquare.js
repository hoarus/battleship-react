import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';

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
    backgroundColor: '#0E3744',
    borderColor: '#0E3744',
  },
  activeSquare: {
    '&:hover': {
      backgroundColor: '#d24531',
      borderColor: '#d24531',
    },
  },
  highlightedSquare: {
    backgroundColor: '#d24531',
    borderColor: '#d24531',
  },
  shipSquare: {
    backgroundColor: '#FBA346',
    borderColor: '#FBA346',
  }, 
  shot: {
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



export default function GameSquare(props) {
  const classes = useStyles();
  const gameState = useContext(GameContext);
  const currentPlayer = props.currentPlayer;
  const players = props.players;
  const setPlayers = props.setPlayers;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const shipOrientation = props.shipOrientation;
  const position = props.position;
  const mostRecentShot = props.mostRecentShot
  const highlightedShipSquares = props.highlightedShipSquares;
  const setHighlightedShipSquares = props.setHighlightedShipSquares;
  const myGameBoard = currentPlayer.myGameBoard;
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


  if(typeof squareType() == "object") /*ship*/{
    return(
      <div className={`${classes.gameSquare} ${classes.shipSquare}`}></div>
    );
  } else if(squareType()=== 1) /*miss*/{
    return(
    <div className={`${classes.gameSquare}`}>
      {mostRecentShot == position && 
        <div className={`${classes.shot}  ${classes.blinkingMiss}`}>❌</div>
      }
      {mostRecentShot != position && 
        <div className={`${classes.shot}`}>❌</div>
      }
    </div>
    )
  } else if(squareType()=== 2)/*hit*/{
    return(
      <div className={`${classes.gameSquare} ${classes.shipSquare}`}>
      {mostRecentShot == position && 
        <div className={`${classes.shot}  ${classes.blinkingHit}`}>❌</div>
      }
      {mostRecentShot != position && 
        <div className={`${classes.shot}`}>❌</div>
      }
    </div>
    )
  } else if (inactiveSquare()){
    return(
      <div className={`${classes.gameSquare}`}></div>
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
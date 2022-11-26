import React, { useState, useEffect,useContext } from 'react';
import { createUseStyles } from 'react-jss';
import GameContext from '../Game/GameContext';
import GameSquare from '../GameSquare/GameSquare';
import OpponentGameSquare from '../OpponentGameSquare/OpponentGameSquare'
import BoardTab from '../BoardTab/BoardTab'

const incrementLetter = function(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i)
}

const useStyles = createUseStyles({

  wrapper: {
    boxSizing:'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7% 2%',
    width: '90%'
  },
  boardWrapper: {
    width: '100%',
    
  },
  gameBoard: {
    boxSizing: 'border-box',
    flex: '2 1 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    border: 'solid 2px #0E3744',
    width: '100%',
    maxHeight: '50vh',
    
  },
  button: {
    flexGrow: '0',
    padding: '0.2rem 1rem',
  }
})


function Board(props) {
  const classes = useStyles();
  const boardType = props.boardType;
  
  const players = props.players;
  const currentPlayer = props.currentPlayer
  const setPlayers = props.setPlayers;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const shipOrientation = props.shipOrientation
  const gameBoard = currentPlayer.myGameBoard;
  const shotTaken = props.shotTaken;
  const setShotTaken = props.setShotTaken;
  const setGameOver = props.setGameOver;
  const turnCount = props.turnCount;
  const setShotResult = props.setShotResult;
  const currentBoard = props.currentBoard;
  const setCurrentBoard = props.setCurrentBoard;
  const mostRecentShot = props.mostRecentShot
  const setMostRecentShot = props.setMostRecentShot;
  const [highlightedShipSquares, setHighlightedShipSquares] = useState([]);

     // Place Ship
  const myGameBoard = currentPlayer.myGameBoard;
  const gameState = useContext(GameContext);
  const ship = currentPlayer.availableShips[0];
  const placeShip = function(position) {
    if (selectedShip === false) {return} 
    else if (currentPlayer.name !== "AI" && myGameBoard.placeShip(ship, position, shipOrientation) !== "Illegal Move") {
      setPlayers(players);
      gameState.update();
      // Update Ships
      removePlacedShip();    
      // Load next ship, setting to false if all ships placed
      if (currentPlayer.availableShips.length === 0) {
        selectShip(false);
      } else {
        selectShip(currentPlayer.availableShips[0]);
      }
    }
  }

  const removePlacedShip = function() {
    const updatedShips = currentPlayer.availableShips.slice(1);
    currentPlayer.availableShips = updatedShips;
  }

  // AI Implementation

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


  const [loading, setLoading] = useState(true);
  useEffect( () => {
    setTimeout( () => {
      setLoading(false)
    }, 500)
  }, [])


  useEffect(() => {
    if (currentPlayer.name === "AI" && !loading) {
      // Place Ships
      if(currentPlayer.availableShips.length > 0) {
        for (let ship of currentPlayer.availableShips) {
          
          currentPlayer.aiPlaceShip(ship);
          removePlacedShip();
        };
        setTimeout(() => {
          gameState.update();
        },500)
      } else if (turnCount > 2 && boardType === "Opponent"){
        // Fire Shot 
        if (shotTaken) {
          return
        }
        
        const coordinates = currentPlayer.aiTurn();
        setShotResult(shotResult(gameBoard.lookupPosition(coordinates)));
        setMostRecentShot(coordinates);
        setShotTaken(true);
        if(currentPlayer.enemyGameBoard.allShipsSunk() === true) {
          setGameOver(true);
        }
      }
  
    }
    // end of AI excerpt
  })




  const ApplicableSquareType = function(props){
    const x = props.x;
    const y = props.y
    if(boardType === "Own") {
      return(
        <GameSquare 
        key={`own[${x}:${y}]`} 
        position={`${incrementLetter(x)}${y + 1}`} 
        players={players} 
        currentPlayer = {currentPlayer}
        setPlayers={setPlayers} 
        selectedShip={selectedShip} 
        selectShip={selectShip}
        shipOrientation={shipOrientation}
        mostRecentShot = {mostRecentShot}
        highlightedShipSquares = {highlightedShipSquares}
        setHighlightedShipSquares = {setHighlightedShipSquares}
        placeShip = {placeShip}
      /> 
      )
    } else {
      return(
        <OpponentGameSquare
        key={`opponent[${x}:${y}]`} 
        position={`${incrementLetter(x)}${y + 1}`} 
        currentPlayer = {currentPlayer}
        shotTaken = {shotTaken}
        setShotTaken={setShotTaken}
        setShotResult={setShotResult}
        setGameOver = {setGameOver}
        mostRecentShot = {mostRecentShot}
        setMostRecentShot = {setMostRecentShot}
      /> 
      )
    }
  }

  return(
    <div className={classes.wrapper}>
      <div className={classes.boardWrapper}>
        {(turnCount > 1) &&
          <BoardTab
            currentBoard = {currentBoard}
            setCurrentBoard = { setCurrentBoard }
          />
        }
        <div className= {classes.gameBoard}>
          {gameBoard.board.map((row, y) =>
            row.map((square, x) =>
            <ApplicableSquareType key={x} x={x} y={y} /> 
            )) }
        </div>
        </div>
    </div>
  )
}

export default Board;
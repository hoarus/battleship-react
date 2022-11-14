import React, { Fragment } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  summaryDetails: {

  },
  header: {
    textAlign: 'center',
  },
  endTurn: {
    width: '50%',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    margin: '1rem',
  } ,
  popUp: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid 0.3rem #0E3744',
    padding: '2rem',
    '-webkit-user-select': 'none', /* Safari */
    '-ms-user-select': 'none', /* IE 10 and IE 11 */
    'user-select': 'none', /* Standard syntax */
    backgroundColor: '#CCE8E6',
    minWidth: '30%',
    top: '35vh',

  } 
})

export default function PlayerDetails(props){
  const classes = useStyles();
  const currentPlayer = props.currentPlayer;
  const enemyGameBoard = currentPlayer.enemyGameBoard;
  const turnCount = props.turnCount;
  const shotResult = props.shotResult;
  const shotTaken = props.shotTaken;
  const setTurnOver = props.setTurnOver;

  const endTurnConditionsMet = function() {
    if (turnCount <= 1 ) {
      // No available ships remaining
      return (Object.keys(currentPlayer.availableShips).length == 0);
    } else {
      return (shotTaken);
    }
  }

  return(
      <div className={classes.popUp}>
        {turnCount <= 1 &&
        <h2>Ships Placed</h2>
        }
        {turnCount > 1 && shotResult != "" && shotTaken &&
        <Fragment>
        <h2>{shotResult}</h2>
        <div>Shots Fired: {enemyGameBoard.totalShotsReceived()}</div>
        <div>Ships Sunk: {enemyGameBoard.shipsSunk()}</div>
        <div>Ships Remaining: {enemyGameBoard.shipsRemaining()}</div>
        </Fragment>
        }
        <button onClick={setTurnOver} className={classes.endTurn} autoFocus>End Turn</button>
      </div>   
  )
}
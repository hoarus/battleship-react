import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  summaryDetails: {
    '-webkit-user-select': 'none', /* Safari */
    '-ms-user-select': 'none', /* IE 10 and IE 11 */
    'user-select': 'none', /* Standard syntax */
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    <div className={classes.summaryDetails}>
      <h2 className={classes.header}>{currentPlayer.name}'s Turn</h2>
      {turnCount > 1 &&
        <div>
          {shotResult != "" && shotTaken &&
            <h2>{shotResult}</h2>
          }
          <div>Shots Fired: {enemyGameBoard.totalShotsReceived()}</div>
          <div>Ships Sunk: {enemyGameBoard.shipsSunk()}</div>
          <div>Ships Remaining: {enemyGameBoard.shipsRemaining()}</div>
        </div>
      }
      {endTurnConditionsMet &&
        <button onClick={setTurnOver} className={classes.endTurn}>End Turn</button>
       }
    </div>
  )
}
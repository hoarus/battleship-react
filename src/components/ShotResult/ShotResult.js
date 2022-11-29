import React, { Fragment, useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  summaryDetails: {

  },
  header: {
    textAlign: 'center',
  },
  button: {
    padding: '1rem',
    margin: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#0E3744',
    backgroundColor: '#CCE8E6',
    border: 'solid 2px #0E3744',
    borderRadius: '2px',
    '&:hover': {
      color: '#d24531',
      borderColor: '#d24531',
    },
  },
  popUp: {
    boxSizing: 'border-box',
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
    width: '90%',
    minWidth: '30%',
    maxWidth: '300px',
    top: '25vh',

  },
  h3: {
    marginTop: '0px',
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
  const [loading, setLoading] = useState(true);
  useEffect( () => {
    setTimeout( () => {
      setLoading(false)
    }, 500)
  }, [])

  const EndTurnButton = function() {
    let buttonText = "End Turn";
    if (currentPlayer.name === "AI") {
      buttonText = "Start Turn"
    }
    return(
      <button onClick={setTurnOver} className={classes.button} autoFocus>{buttonText}</button>
    )
  }

  if(loading){
    return(
      <div></div>
    )
  } else return(
      <div className={classes.popUp}>
        {currentPlayer.name === "AI" &&
          <h2>AI Turn Complete</h2>
        }
        {turnCount <= 1 &&
          <h3 className={classes.h3}>Ships Placed</h3>
        }
        {turnCount > 1 && shotResult !== "" && shotTaken &&
        <Fragment>
        <h2>{shotResult}</h2>
        <div>Shots Fired: {enemyGameBoard.totalShotsReceived()}</div>
        <div>Ships Sunk: {enemyGameBoard.shipsSunk()}</div>
        <div>Ships Remaining: {enemyGameBoard.shipsRemaining()}</div>
        </Fragment>
        }
        <EndTurnButton/>
        
    </div>  
 
  )
}
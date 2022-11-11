import React, {useState} from 'react';

import {createUseStyles} from 'react-jss';


const useStyles = createUseStyles({
  wrapper: {
    color: '0E3744',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0E3744',
    width: '100%',
    height: '80vh',
    border: 'solid 2px black',
    padding: '10%',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CCE8E6',
    border: 'solid 0.3rem #A8BDC5',
    borderRadius: '5px',
    width: '40%',
    padding: '2rem',
    textAlign: 'center',
  },
  button: {
    width: '50%',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    margin: '1rem',
  },
  darkBlue: {
    color: '#0E3744',
  }
})


export default function NextTurn(props){
  const players = props.players;
  const currentPlayer = props.currentPlayer;
  const setCurrentPlayer = props.setCurrentPlayer;
  const setTurnOver = props.setTurnOver;
  const turnCount = props.turnCount;
  const setTurnCount = props.setTurnCount;
  const setShotTaken = props.setShotTaken;

  let nextPlayer = "";
  if (players[0] === currentPlayer) {
    nextPlayer=(players[1]);
  } else {
    nextPlayer=(players[0]);
  }

  const endTurn = function() {
    setCurrentPlayer(nextPlayer);
    setTurnCount(turnCount + 1);
    setTurnOver(false);
    setShotTaken(false);
  }



  const classes = useStyles();

  return(
    <div className={classes.wrapper}>
      <div className={classes.messageContainer}>
        <h2 className={classes.darkBlue}>Next Player's Turn</h2>
        <p>Please pass the game to {nextPlayer.name}.</p>
        <button className={classes.button} onClick={endTurn}>Start {nextPlayer.name}'s Turn</button>
      </div>
    </div>
  )
}
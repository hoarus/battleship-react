import React, {useState} from 'react';

import {createUseStyles} from 'react-jss';


const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '80vh',
    border: 'solid 2px black',
    justifyContent: 'center',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    border: 'solid 2px black',
    width: '80%',
    padding: '2rem',
    textAlign: 'center',
  },
  button: {
    padding: '0.2rem 2rem'
  }
})


export default function NextTurn(props){
  const players = props.players;
  const currentPlayer = props.currentPlayer;
  const setCurrentPlayer = props.setCurrentPlayer;
  const setTurnOver = props.setTurnOver;
  const turnCount = props.turnCount;
  const setTurnCount = props.setTurnCount;

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
  }



  const classes = useStyles();

  return(
    <div className={classes.wrapper}>
      <div className={classes.messageContainer}>
        <h2>Next Player's Turn</h2>
        <p>Please pass the game to {nextPlayer.name}.</p>
        <button className={classes.button} onClick={endTurn}>Start {nextPlayer.name}'s Turn</button>
      </div>
    </div>
  )
}
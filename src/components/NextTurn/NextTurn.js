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
  const selectShip = props.selectShip;

  let nextPlayer = "";
  if (players[0] === currentPlayer) {
    nextPlayer=(players[1]);
  } else {
    nextPlayer=(players[0]);
  }

  const endTurn = function() {
    selectShip(nextPlayer.availableShips[0]);
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
        <button className={classes.button} onClick={endTurn} autoFocus>Start {nextPlayer.name}'s Turn</button>
      </div>
    </div>
  )
}
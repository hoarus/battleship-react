import React from 'react';
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
  button: {
    padding: '1rem',
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
  darkBlue: {
    color: '#0E3744',
  },
  messageContainer: {
    boxSizing: 'border-box',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid 0.3rem #0E3744',
    borderRadius: '3%',
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
  wrapper: {
    color: '0E3744',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CCE8E6',
    width: '100%',
    height: '80vh',
    padding: '10%',
  },
})


export default function NextTurn(props){
  
  const currentPlayer = props.currentPlayer;
  const players = props.players; 
  const selectShip = props.selectShip;
  const setCurrentPlayer = props.setCurrentPlayer;
  const setShotTaken = props.setShotTaken;
  const setTurnCount = props.setTurnCount;
  const setTurnOver = props.setTurnOver;
  const turnCount = props.turnCount;

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
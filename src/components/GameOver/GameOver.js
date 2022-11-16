import React from 'react';

import {createUseStyles} from 'react-jss';


const useStyles = createUseStyles({
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
    top: '25vh',
  },
  button: {
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    margin: '1rem',
  },
  darkBlue: {
    color: '#0E3744',
  }
})

export default function GameOver(props){
  const classes = useStyles();
  const currentPlayer = props.currentPlayer;

  const reloadPage = () => {
    window.location.reload();
  }
  
  return(
    <div className={classes.wrapper}>
    <div className={classes.messageContainer}>
      <h2 className={classes.darkBlue}>Game Over</h2>
      <h2 className={classes.darkBlue}>{currentPlayer.name} has won!</h2>
      <button className={classes.button} onClick={reloadPage}> Play Again?</button>
    </div>
  </div>
  )
}
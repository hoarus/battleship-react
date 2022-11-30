import React from 'react';

import {createUseStyles} from 'react-jss';


const useStyles = createUseStyles({
  wrapper: {
    color: 'white',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#121212',
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
    border: 'solid 0.3rem white',
    borderRadius: '3%',
    padding: '2rem',
    '-webkit-user-select': 'none', /* Safari */
    '-ms-user-select': 'none', /* IE 10 and IE 11 */
    'user-select': 'none', /* Standard syntax */
    backgroundColor: '#121212',
    width: '90%',
    minWidth: '30%',
    maxWidth: '300px',
    top: '25vh',
  },
  button: {
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#121212',
    border: 'solid 2px white',
    borderRadius: '2px',
    '&:hover': {
      color: '#ffc600',
      borderColor: '#ffc600',
    },
  },
  yellow: {
    color: '#ffc600',
  }

})

export default function GameOver(props){
  const classes = useStyles();
  const currentPlayer = props.currentPlayer;
  const reloadPage = () => window.location.reload();
  
  return(
    <div className={classes.wrapper}>
    <div className={classes.messageContainer}>
      <h2 className={classes.yellow}>Game Over</h2>
      <h2>{currentPlayer.name} has won!</h2>
      <button className={classes.button} onClick={reloadPage}> Play Again?</button>
    </div>
  </div>
  )
}
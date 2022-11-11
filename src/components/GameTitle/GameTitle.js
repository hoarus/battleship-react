import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameTitle: {
    color: '#0E3744',
    margin: '2rem',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  }
  
})

export default function GameTitle(){
  const classes = useStyles();
  
  return(
    <div className={classes.wrapper}>
      <h1 className={classes.gameTitle}>BATTLESHIP</h1>
    </div>
  )
}
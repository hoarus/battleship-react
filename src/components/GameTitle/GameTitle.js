import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  gameTitle: {
    color: 'darkblue'
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
      <h1 className={classes.gameTitle}>Battleship</h1>
    </div>
  )
}
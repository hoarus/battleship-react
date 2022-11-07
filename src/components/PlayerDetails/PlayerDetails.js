import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    textAlign: 'center',
  }
})

export default function PlayerDetails(props){
  const classes = useStyles();
  const currentPlayer = props.currentPlayer;

  return(
    <div>
      <h2 className={classes.header}>{currentPlayer.name}'s Turn</h2>
    </div>
  )
}
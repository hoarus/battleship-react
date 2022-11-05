import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    border: 'solid 2px blue',
    margin: ' 1rem 0rem',
  }
})


function PlaceShips() {
  const classes = useStyles();

  return(
    <div className={classes.wrapper}>
      <h2>Place Ships</h2>
    </div>
  )
  


}

export default PlaceShips;
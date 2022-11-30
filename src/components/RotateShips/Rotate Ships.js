import React, { Fragment, useContext, useState } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';
import { render } from '@testing-library/react';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '5px',
    color: 'white',
  },
  button: {
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    width: '100%',
    backgroundColor: '#121212',
    border: 'solid 2px white',
    borderRadius: '2px',
    '&:hover': {
      color: '#ffc600',
      borderColor: '#ffc600',
    },
  } 
})


function PlaceShips(props) {
  const classes = useStyles();
  const shipOrientation = props.shipOrientation;
  const setShipOrientation = props.setShipOrientation;
  const toggleOrientation = function() {
    if (shipOrientation === "x") {
      setShipOrientation("y");
    } else {
      setShipOrientation("x")
    }
  }


    return(
      <div className={classes.wrapper}>
        <h2>Place your ships</h2> 
        <button className={classes.button} onClick={toggleOrientation}>Rotate Ship</button>
      </div>
    )



  


}

export default PlaceShips;
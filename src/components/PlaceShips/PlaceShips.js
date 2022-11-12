import React, { useContext, useState } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';
import { render } from '@testing-library/react';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'solid 2px #0E3744',
    borderRadius: '5px',
  },
  shipGalley: {
    padding: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1rem',
  },
  shipContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  shipName: {
    textAlign: 'center',
  },
  ship:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBA346',
    '&:hover': {
      backgroundColor: '#d24531',
    },
  },
  verticalShip:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

  },
  square:{
    border: 'solid 1px #0E3744',
    display: 'inline-block',
    marginLeft:'-1px',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
    width: '5rem',
  },
  selected: {
    backgroundColor: '#d24531',
    '&:hover': {
      backgroundColor: '#d24531',
    },
  },
  selectedShipContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  rotateShip: {
    width: '100%',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
  }
})


function PlaceShips(props) {
  const classes = useStyles();
  const shipOrientation = props.shipOrientation;
  const setShipOrientation = props.setShipOrientation;


  const ShipOrientationContainer = function(){
    const toggleOrientation = function() {
      if (shipOrientation == "x") {
        setShipOrientation("y")
      } else {
        setShipOrientation("x")
      }

    }
    return(
      <button className={classes.rotateShip} onClick={toggleOrientation}>Rotate Ship</button>
    )

  }



    return(
      <div className={classes.wrapper}>
        <ShipOrientationContainer/>
      </div>
    )



  


}

export default PlaceShips;
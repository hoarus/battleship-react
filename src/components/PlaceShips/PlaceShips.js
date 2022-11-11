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
  const currentPlayer= props.currentPlayer;
  const ships = currentPlayer.availableShips;
  const selectShip = props.selectShip;
  const selectedShip = props.selectedShip;
  const shipOrientation = props.shipOrientation;
  const setShipOrientation = props.setShipOrientation;


  const renderShip = (length, key) => {
    let ship = [];
    for (let i = 0; i < length; i++) {
      ship.push(<div key={`${key}[${i}]`} className={classes.square}></div>)
    }
    return ship;
  }


  const highlightShip = function(event, shipName){

    selectShip({
      name: shipName,
      ship: ships[shipName],
    });
  }

  const ShipGalley = function() {
    return(
      <div className= {classes.shipGalley}>
      {Object.keys(ships).map((key, index) => {
        const length = ships[key].getLength();
        if(key != selectedShip.name) {
        return(
          <div className={classes.shipContainer} key={`shipContainer${index}`}>
            <div className={classes.shipName} key={`shipName${index}`}>{key}</div>
            <div key={`${index} ship`}className={classes.ship}  onClick={e => highlightShip(e, key)} length={length} name={key}>{renderShip(length, key)}</div>
          </div>
        )
        }
    })}
    </div>
    )
  }

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

  const SelectedShipContainer = function() {

    const shipOrientationClass = function() {
      if (shipOrientation == "x") {
        return(classes.ship)
      } else {
        return(`${classes.ship} ${classes.verticalShip}`)
      }
    }

    if (!selectedShip == false) {
      return(
        <div className={classes.selectedShipContainer}>
          <div className={classes.shipContainer}>
            <div className={classes.shipName}>{selectedShip.name}</div>
            <div className={`${shipOrientation == 'x' ? classes.ship : classes.verticalShip} ${classes.selected}`}>{renderShip(selectedShip.ship.length, "selected")}</div>
          </div>
          <ShipOrientationContainer/>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }
  }



    return(
      <div className={classes.wrapper}>
        <h2>Available Ships</h2>
        <SelectedShipContainer/>
        <ShipGalley/>
      </div>
    )



  


}

export default PlaceShips;
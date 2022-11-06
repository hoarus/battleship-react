import React, { useContext, useState } from 'react';
import GameContext from '../Game/GameContext';
import { createUseStyles } from 'react-jss';
import {Ship} from '../GameLogic/Ship';

const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: 'solid 2px blue',
    margin: ' 1rem 0rem',
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
    height: '2rem',
    justifyContent: 'center',
    backgroundColor: 'orange',
    '&:hover': {
      backgroundColor: 'pink',
    },
  },
  square:{
    border: 'solid 1px darkblue',
    display: 'inline-block',
    marginLeft:'-1px',
    height: '100%',
    boxSizing: 'border-box',
    aspectRatio: '1/1',
  },
  selected: {
    backgroundColor: 'purple',
    '&:hover': {
      backgroundColor: 'purple',
    },
  }
})


function PlaceShips(props) {
  const classes = useStyles();
  const ships = props.ships;
  const setShips = props.setShips;
  let selectedShip = false;

  const renderShip = (length, key) => {
    let ship = [];
    for (let i = 0; i < length; i++) {
      ship.push(<div key={`${key}[${i}]`} className={classes.square}></div>)
    }
    return ship;
  }


  const selectShip = function(event){
    (selectedShip == false)|| selectedShip.classList.remove(classes.selected);
    selectedShip = event.currentTarget;
    selectedShip.classList.add(classes.selected);
  }

  return(
    <div className={classes.wrapper}>
      <h2>Place Ships</h2>
      <div className= {classes.shipGalley}>
        {Object.keys(ships).map((key, index) => {
          const length = ships[key].getLength();
          return(
            <div className={classes.shipContainer} key={`shipContainer${index}`}>
              <div className={classes.shipName} key={`shipName${index}`}>{key}</div>
              <div key={`${index} ship`}className={classes.ship}  onClick={selectShip} length={length} name={key}>{renderShip(length, key)}</div>
            </div>
          )
      })}
      </div>
    </div>
  )
  


}

export default PlaceShips;
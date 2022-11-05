import React, {Fragment}  from 'react';
import Board from '../GameBoard/Board';
import PlaceShips from '../PlaceShips/PlaceShips';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%'
  }
})


function Game() {
  const classes = useStyles();
  return (
      <div className={classes.gameWrapper}>
        <PlaceShips/>
        <Board/>
      </div>
  );
}

export default Game;

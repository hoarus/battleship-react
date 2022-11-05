import React, {Fragment}  from 'react';
import Board from '../GameBoard/Board';
import GameTitle from '../GameTitle/GameTitle';
import PlaceShips from '../PlaceShips/PlaceShips';
import './normalize.css';

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


function App() {
  const classes = useStyles();
  return (
    <div className={classes.pageWrapper}>
      <div className={classes.gameWrapper}>
        <GameTitle/>
        <PlaceShips/>
        <Board/>
      </div>
    </div>
  );
}

export default App;

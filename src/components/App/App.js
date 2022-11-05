import React, {Fragment}  from 'react';
import GameTitle from '../GameTitle/GameTitle';
import Game from '../Game/Game';
import './normalize.css';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})


function App() {
  const classes = useStyles();
  return (
    <div className={classes.pageWrapper}>
        <GameTitle/>
        <Game/>
    </div>
  );
}

export default App;

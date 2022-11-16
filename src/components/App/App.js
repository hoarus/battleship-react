import React  from 'react';
import GameTitle from '../GameTitle/GameTitle';
import Game from '../Game/Game';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#CCE8E6',
    minHeight: '100vh',
  },
})

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.pageWrapper}>
        <GameTitle/>
        <Game/>
    </div>
  );
}
import React from 'react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  tabsContainer: {
    display: 'flex',
  },
  boardTab: {
    backgroundColor: 'red',
    margin: '0px',
    width: '20%',
    padding: '0.2rem',
    textAlign: 'center',
    border: 'solid 1px blue',
    borderTopLeftRadius: '20%',
    borderTopRightRadius: '20%',
    boxSizing: 'border-box',
  }
})

export default function BoardTab() {

  const classes = useStyles();
  return(
    <div className={classes.tabsContainer}>
      <div className={classes.boardTab}>My Board</div>
      <div className={classes.boardTab}>Enemy Board</div>
    </div>
  )
}
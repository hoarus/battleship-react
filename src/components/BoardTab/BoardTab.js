import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  boardTab: {
    backgroundColor: '#d24531',
    margin: '0px',
    width: '50%',
    padding: '0.5rem',
    color: 'white',
    textAlign: 'center',
    border: 'solid 1px #CCE8E6',
    borderTopLeftRadius: '20%',
    borderTopRightRadius: '20%',
    boxSizing: 'border-box',
    '-webkit-user-select': 'none', /* Safari */
    '-ms-user-select': 'none', /* IE 10 and IE 11 */
    'user-select': 'none', /* Standard syntax */
    '&:hover': {
      backgroundColor: 'pink'
    },
  },
  selectedTab: {
    backgroundColor: '#0E3744',
    color: 'white',
    '&:hover': {
      backgroundColor: '#0E3744'
    },
  },
  tabsContainer: {
    display: 'flex',
    width: '100%',
  },
})

export default function BoardTab(props) {
  const classes = useStyles();
  const currentBoard = props.currentBoard;
  const setCurrentBoard = props.setCurrentBoard;
  

  const displayMyBoard = () => setCurrentBoard("My Board")
  const displayEnemyBoard = () => setCurrentBoard("Enemy Board")

  if (currentBoard === "Enemy Board") {
    return(
      <div className={classes.tabsContainer}>
        <div className={classes.boardTab} onClick={displayMyBoard}>My Board</div>
        <div className={`${classes.boardTab} ${classes.selectedTab}`}>Enemy Board</div>
      </div>
    )
  } else {
    return(
      <div className={classes.tabsContainer}>
        <div className={`${classes.boardTab} ${classes.selectedTab}`}>My Board</div>
        <div className={classes.boardTab} onClick={displayEnemyBoard}>Enemy Board</div>
      </div>
    )
  }
}
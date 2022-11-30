import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  boardTab: {
    boxSizing: 'border-box',
    backgroundColor: 'white', //'#d24531',
    color: '#121212',
    opacity: '0.5',
    margin: '0px',
    padding: '0.5rem',
    width: '100%',
    textAlign: 'center',
    border: 'solid 1px white',
    borderTopLeftRadius: '20%',
    borderTopRightRadius: '20%',
    boxSizing: 'border-box',
    '-webkit-user-select': 'none', /* Safari */
    '-ms-user-select': 'none', /* IE 10 and IE 11 */
    'user-select': 'none', /* Standard syntax */
    '&:hover': {
      opacity: '0.7'
    },
  },
  selectedTab: {
    opacity: '1',
    '&:hover': {
      opacity: '1',
    },
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
  },
})

export default function BoardTab(props) {
  const classes = useStyles();
  const currentBoard = props.currentBoard;
  const setCurrentBoard = props.setCurrentBoard;
  const currentPlayer = props.currentPlayer;
  

  const displayMyBoard = () => setCurrentBoard("My Board")
  const displayEnemyBoard = () => setCurrentBoard("Enemy Board")

  if (currentPlayer.name == "AI") {
    return(
      <div className={classes.tabsContainer}>
        <div className={`${classes.boardTab} ${classes.selectedTab}`}>Enemy Board</div>
      </div>
    )
  } else if (currentBoard === "Enemy Board") {
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
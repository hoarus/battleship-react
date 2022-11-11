import React from 'react';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  tabsContainer: {
    display: 'flex',
  },
  boardTab: {
    backgroundColor: '#d24531',
    margin: '0px',
    width: '20%',
    padding: '0.5rem',
    color: 'white',
    textAlign: 'center',
    border: 'solid 1px blue',
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
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
      backgroundColor: 'blue'
    },
  }
})

export default function BoardTab(props) {
  const currentBoard = props.currentBoard;
  const setCurrentBoard = props.setCurrentBoard;
  const classes = useStyles();

  const displayMyBoard = () => setCurrentBoard("My Board")
  const displayEnemyBoard = () => setCurrentBoard("Enemy Board")

  if (currentBoard == "Enemy Board") {
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
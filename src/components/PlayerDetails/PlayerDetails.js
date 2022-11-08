import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    textAlign: 'center',
  }
})

export default function PlayerDetails(props){
  const classes = useStyles();
  const currentPlayer = props.currentPlayer;
  const enemyGameBoard = currentPlayer.enemyGameBoard;
  let countInArray = function (inputArr, test) {
    let count = 0;
  
    const search = (arr, test) => {
      for (let a of arr) {
        //if not an array test the element
        //if it passes the test, store its result
        if (test(a)) {
          count += 1;
        }
  
        //if sub-array
        if (Array.isArray(a)) {
          //recursively filter the sub-array
          search(a, test);
        }
      }
    };
    search(inputArr, test);
    return count;
  };
  const shotsTaken = enemyGameBoard.totalShotsReceived();
  // const hits = countInArray(enemyBoard, (e) => e === 2);


  return(
    <div>
      <h2 className={classes.header}>{currentPlayer.name}'s Turn</h2>
      <div>Shots Fired: {enemyGameBoard.totalShotsReceived()}</div>
      <div>Ships Sunk: {enemyGameBoard.shipsSunk()}</div>
      <div>Ships Remaining: {enemyGameBoard.shipsRemaining()}</div>
    </div>
  )
}
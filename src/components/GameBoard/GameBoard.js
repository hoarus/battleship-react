import React, { createContext } from 'react';
import GameSquare from '../GameSquare/GameSquare';
import { createUseStyles } from 'react-jss';
import {GameBoard} from './GameBoardLogic';
import GameContext from './Game';

const user = {
  name: 'Kwame',
  favorites: [
    'avocado',
    'carrot'
  ]
}


const useStyles = createUseStyles({
  gameBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    border: 'solid 2px darkblue',
    width: '80%',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  }
})

function Board() {

  const classes = useStyles();
  const gameBoard = new GameBoard();
  console.log(gameBoard.board[0][0]);

  return(
    <div className={classes.wrapper}>
      <GameContext.Provider value={gameBoard}>
        <div className= {classes.gameBoard}>
          {gameBoard.board.map((row, y) =>
            row.map((square, x) =>
            <GameSquare key={x} value={square} position={`[${y}][${x}]`}/> 
            )) }
        </div>
      </GameContext.Provider>
    </div>
  )
}

export default Board;
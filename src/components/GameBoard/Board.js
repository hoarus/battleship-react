import React, { createContext } from 'react';
import GameSquare from '../GameSquare/GameSquare';
import { createUseStyles } from 'react-jss';
import {GameBoard} from './GameBoard';
import GameContext from './GameContext';


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

const incrementLetter = function(i) {
  return String.fromCharCode('A'.charCodeAt(0) + i)
}

const gameBoard = new GameBoard();


function Board() {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []); 
  const classes = useStyles();

  const gameState = {
    gameBoard: gameBoard,
    updateIncrementer: 0,
    update: forceUpdate,
  }
  // Need to force a way for the context to rerender
    // I think this should be an overarching object that includes the game components
    // In addition, there will be one component of the object that is updated anytime something in the game changes, which forces the rerender
      // Will probably use State for this

  return(
    <div className={classes.wrapper}>
      <GameContext.Provider value={gameState}>
        <div className= {classes.gameBoard}>
          {gameBoard.board.map((row, y) =>
            row.map((square, x) =>
            <GameSquare key={x} value={square} position={`${incrementLetter(x)}${y + 1}`}/> 
            )) }
        </div>
        <button onClick={forceUpdate}>Force re-render</button>
      </GameContext.Provider>
    </div>
  )
}

export default Board;
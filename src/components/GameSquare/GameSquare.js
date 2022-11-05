import React, { useContext } from 'react';
import GameContext from '../GameBoard/Game';

function GameSquare(props) {

  const gameBoard = useContext(GameContext);
  const style = {
    gameSquare:{
      border: 'solid 1px darkblue',
      backgroundColor: 'lightgreen',
      width: '100%',
      height: '100%',
      boxSizing: 'border-box',
      aspectRatio: '1/1',
      
    }
  }

  return(
    <div style={style.gameSquare}>{gameBoard.lookupPosition('a6')}</div>
  );
}

export default GameSquare;
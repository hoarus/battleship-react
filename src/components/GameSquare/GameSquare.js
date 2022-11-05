import React from 'react';

function GameSquare() {
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
    <div style={style.gameSquare}></div>
  );
}

export default GameSquare;
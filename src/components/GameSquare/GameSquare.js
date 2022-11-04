import React from 'react';

function GameSquare() {
  const style = {
    gameSquare:{
      border: 'solid 2px red',
    }
  }

  return(
    <div style={style.gameSquare}>x</div>
  );
}

export default GameSquare;
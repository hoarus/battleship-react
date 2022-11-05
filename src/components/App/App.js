import React, {Fragment}  from 'react';
import Board from '../GameBoard/Board';
import GameTitle from '../GameTitle/GameTitle';
import './normalize.css';

function App() {
  return (
    <Fragment>
      <GameTitle/>
      <Board/>
    </Fragment>
  );
}

export default App;

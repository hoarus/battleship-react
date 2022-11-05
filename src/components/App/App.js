import React, {Fragment}  from 'react';
import GameBoard from '../GameBoard/GameBoard';
import GameTitle from '../GameTitle/GameTitle';
import './normalize.css';

function App() {
  return (
    <Fragment>
      <GameTitle/>
      <GameBoard/>
    </Fragment>
  );
}

export default App;

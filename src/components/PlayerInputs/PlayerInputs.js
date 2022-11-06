import React, { useState, useContext } from 'react';
import {Player} from '../GameLogic/Player';
import GameContext from '../Game/GameContext';

export default function PlayerInputs(props){

  const gameState = useContext(GameContext);
  const [names, setNames] = useState('');
  const setName = function(event) {
    setNames({
      ...names,
      [event.target.name]: event.target.value
    })
  }
  const createPlayers = event => {
    event.preventDefault();
    (names.playerOne == undefined) || (gameState.playerOne.name = names.playerOne);
    (names.playerTwo == undefined) || (gameState.playerTwo.name = names.playerTwo);
    gameState.setPlayers([gameState.playerOne, gameState.playerTwo]);
  }

   return(
    <div>
      <form onSubmit={createPlayers}>
        <h2>Player Names</h2>
          <label>
            <input 
              autoComplete='off'
              name='playerOne' 
              type='text' 
              placeholder='Player One'
              onChange={setName}/>
         </label>
          <label>
          <input 
              autoComplete='off'
              name='playerTwo' 
              type='text' 
              placeholder='Player Two'
              onChange={setName}/>
         </label>
        <button type='submit'>Save Names</button>
      </form>
    </div>
  )
}
import React, { useState, useContext } from 'react';
import {Player} from '../GameLogic/Player';
import GameContext from '../Game/GameContext';

export default function PlayerDetails(props){

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
    const playerOne = new Player(names.playerOne);
    const playerTwo = new Player(names.playerTwo);
    gameState.setPlayers([playerOne, playerTwo]);
  }

  const playerOne = gameState.players[0];
  const playerTwo = gameState.players[1];

  if (gameState.players.length == 0) {
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
   } else {
    return(
      <div>
        <h2>Player One: {playerOne.name}</h2>
        <h2>Player Two: {playerTwo.name}</h2>
      </div>
    )
   }
}
import React, { useState } from 'react';

export default function PlayerInputs(props){
  const players = props.players;
  const setPlayers = props.setPlayers;

  const [names, setNames] = useState('');
  const setName = function(event) {
    setNames({
      ...names,
      [event.target.name]: event.target.value
    })
  }
  const createPlayers = event => {
    event.preventDefault();
    (names.playerOne == undefined) || (players[0].name = names.playerOne);
    (names.playerTwo == undefined) || (players[1].name = names.playerTwo);
    setPlayers([players[0], players[1]]);
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
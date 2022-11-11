import React, { useState } from 'react';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  header: {
    textAlign: 'center',
    marginBottom: '0px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    fontSize: '1.2rem',
  },
  button: {
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
  }  
})

export default function PlayerInputs(props){
  const classes = useStyles();
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
      <form onSubmit={createPlayers} className={classes.form}>
        <h2 className={classes.header}>Player Names</h2>
          <label>
            <input 
              className={classes.field}
              autoComplete='off'
              name='playerOne' 
              type='text' 
              placeholder='Player One'
              onChange={setName}/>
         </label>
          <label>
          <input 
              autoComplete='off'
              className={classes.field}
              name='playerTwo' 
              type='text' 
              placeholder='Player Two'
              onChange={setName}/>
         </label>
        <button type='submit' className={classes.button}>Save Names</button>
      </form>
  )
}
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
  } ,
  centerText: {
    textAlign: 'center',
    margin: '0px',
  } 
})

export default function PlayerInputs(props){
  const classes = useStyles();
  const players = props.players;
  const setPlayers = props.setPlayers;

  const [names, setNames] = useState({playerOne: "", playerTwo: ""});
  const [formErrors, setFormErrors] = useState({playerOne: "", playerTwo: ""});
  const setName = function(event) {
    setNames({
      ...names,
      [event.target.name]: event.target.value
    })
  }


  const validateNames = function() {
    if (names.playerOne == "") {
      setFormErrors({
        ...formErrors,
        playerOne: "Please enter a name."
      })
      return false;
    } else if (names.playerTwo == "") {
      setFormErrors({
        ...formErrors,
        playerOne: "",
        playerTwo: "Please enter a name."
      })
      return false;
    } else {
      return true;
    }
  }

  const createPlayers = function() {
    (players[0].name = names.playerOne);
    (players[1].name = names.playerTwo);
    setPlayers([players[0], players[1]]);
  }

  const submitForm = event => {
    event.preventDefault();
    if (validateNames()) {
      createPlayers();
    }
  }

   return(
      <form onSubmit={submitForm} className={classes.form}>
        <p className={classes.centerText}>Welcome to Basic Battleship!</p>
        <p className={classes.centerText}>Please input player names to get started.</p>
        <h2 className={classes.header}>Player Names</h2>
          <label>
            <input 
              className={classes.field}
              autoComplete='off'
              name='playerOne' 
              type='text' 
              placeholder='Player One'
              onChange={setName}/>
            <p>{formErrors.playerOne}</p>
         </label>
          <label>
          <input 
              autoComplete='off'
              className={classes.field}
              name='playerTwo' 
              type='text' 
              placeholder='Player Two'
              onChange={setName}/>
            <p>{formErrors.playerTwo}</p>
         </label>
        <button type='submit' className={classes.button}>Get Started</button>
      </form>
  )
}
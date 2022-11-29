import React, { useState, Fragment } from 'react';

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
    fontWeight: 'bold',
    color: '#0E3744',
    backgroundColor: '#CCE8E6',
    border: 'solid 2px #0E3744',
    borderRadius: '2px',
    '&:hover': {
      color: '#d24531',
      borderColor: '#d24531',
    },
  } ,
  centerText: {
    textAlign: 'center',
    margin: '0px',
  },
  error: {
    marginBottom: '0px',
    color: 'darkRed',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})

export default function PlayerInputs(props){
  const classes = useStyles();
  const players = props.players;
  const setPlayers = props.setPlayers;
  const [toggleButtonText, setToggleButtonText] = useState("2-Player");
  const [names, setNames] = useState({playerOne: "", playerTwo: ""});
  const [formErrors, setFormErrors] = useState({playerOne: "", playerTwo: ""});
  const setName = function(event) {
    setNames({
      ...names,
      [event.target.name]: event.target.value
    })
  }


  const validateNames = function() {
    if (names.playerOne === "") {
      setFormErrors({
        ...formErrors,
        playerOne: "Please enter a name."
      })
      return false;
    } else if (names.playerTwo === "" && toggleButtonText === "1-Player") {
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
    if (names.playerTwo != "") {
      (players[1].name = names.playerTwo);
    }
    setPlayers([players[0], players[1]]);
  }

  const submitForm = (event) => {
    event.preventDefault();
    if (validateNames()) {
      createPlayers();
    } else {
      return;
    }
  }

  const toggleTwoPlayer = (event) => {
    event.preventDefault();
    if (toggleButtonText == "2-Player") {
      setToggleButtonText("1-Player");
    } else {
      setToggleButtonText("2-Player");
    }
  }

   return(
    <Fragment>
      <div className={classes.form}>
          <p className={classes.centerText}>Welcome to Basic Battleship!</p>
          <p className={classes.centerText}>Please input player names to get started.</p>
          <button className={classes.button} onClick={toggleTwoPlayer}>Toggle {toggleButtonText}</button>
      </div>
      <form onSubmit={submitForm} className={classes.form}>

        <h2 className={classes.header}>Player Names</h2>
          <label className={classes.label}>
            <input 
              className={classes.field}
              autoComplete='off'
              name='playerOne' 
              type='text' 
              placeholder='Player One'
              onChange={setName}/>
            <p className={classes.error}>{formErrors.playerOne}</p>
         </label>
         {toggleButtonText == "1-Player" &&
          <label className={classes.label}>
            <input 
                autoComplete='off'
                className={classes.field}
                name='playerTwo' 
                type='text' 
                placeholder='Player Two'
                onChange={setName}/>
              <p className={classes.error}>{formErrors.playerTwo}</p>
          </label>
          }
         
        <button type='submit' className={classes.button} autoFocus>Get Started</button>
      </form>
    </Fragment>
  )
}
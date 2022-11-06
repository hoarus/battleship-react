import React from 'react';

export default function PlayerDetails(props){
  const playerOne = props.players[0];
  const playerTwo = props.players[1];
  const currentPlayer = playerOne;

  return(
    <div>
      <h2>Player Name: {currentPlayer.name}</h2>
    </div>
  )
}
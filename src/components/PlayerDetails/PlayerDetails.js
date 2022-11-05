import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';


export default function PlayerDetails(){

  const gameState = useContext(GameContext);
  const playerOne = gameState.players[0];
  const playerTwo = gameState.players[1];
  const currentPlayer = playerOne;

  return(
    <div>
      <h2>Player Name: {currentPlayer.name}</h2>
    </div>
  )
}
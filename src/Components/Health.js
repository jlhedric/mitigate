import React from 'react'
import Values from './Values'

const Health = ({id, partyHp}) => {
  //calculations need to have happened before these render
  const players = Object.keys(partyHp)
  const partyListItems = players.map(player => <li key={`second-${id}-${player}`}> Second {id+1} {player} HP: {partyHp[player]}</li>)
    return (
      <span>
        HP at sec {id+1}:
        <ul>{partyListItems}</ul>
        <Values id={id}></Values>
      </span>
    )
  }

export default Health;

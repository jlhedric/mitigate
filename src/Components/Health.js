import React from 'react'
import Values from './Values'

const Health = ({id, partyHp}) => {
  const players = Object.keys(partyHp)
  const partyListItems = players.map(player => <li key={`second-${id}-${player}`}> Second {id+1} {player} HP: {partyHp[player]}</li>)
    return (
      <span>
        <ul>{partyListItems}</ul>
        <Values id={id}></Values>
      </span>
    )
  }

export default Health;

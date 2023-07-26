import React from 'react'
import Values from './Values'

export default function Health({id, partyHp}) {
  const partyListItems = Object.keys(partyHp).map(player => <li key={`second-${id}-${player}`}> Second {id+1} {player} HP: {partyHp[player]}</li>)
    return (
      <ul>{partyListItems}</ul>
    )
  }

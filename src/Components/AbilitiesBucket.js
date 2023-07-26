import React from 'react'
import Abilities from './Abilities'

export default function AbilitiesBucket({fightDuration}) {
  return (
    <span>
      {Array(fightDuration).fill(1).map((_, index) => (<Abilities key={index}/>))}
    </span>
  )
}

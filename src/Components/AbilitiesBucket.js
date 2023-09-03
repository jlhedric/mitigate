import React from 'react'
import Abilities from './Abilities'

const AbilitiesBucket = ({ fightDuration, partyAttributes, abilitiesCollection, onSubmit }) => {
  const duration = Array(fightDuration).fill(1)

  return (
    <span>
      {duration.map((_, second) => (<Abilities key = {second+1} id={second+1} partyAttributes={partyAttributes} activeAbilitiesPerSec={abilitiesCollection[second]} onSubmit={onSubmit}/>))}
    </span>
  )
}

export default AbilitiesBucket;
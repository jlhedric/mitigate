import React from 'react'
import Abilities from './Abilities'

const AbilitiesBucket = ({ fightDuration }) => {
  const childrenAmount = Array(fightDuration).fill(1)

  return (
    <span>
      {childrenAmount.map((_, index) => (<Abilities key={index} />))}
    </span>
  )
}

export default AbilitiesBucket;
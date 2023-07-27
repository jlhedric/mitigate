import React from 'react'
import Health from './Health'

const HpBucket = ({fightDuration, hpCollection, damageCollection, abilityCollection}) => {
  // do the calculations to create a finalHpCollection
  // store the mit info and heals to be passed to Values
  const childrenAmount = Array(fightDuration).fill(1)

  return (
    <span>
      {childrenAmount.map((_, index) => (<Health key={index} id={index} partyHp={hpCollection[index]}/>))}
    </span>
  )
}

export default HpBucket;
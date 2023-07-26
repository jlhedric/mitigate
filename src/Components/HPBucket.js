import React from 'react'
import Health from './Health'

export default function HpBucket({fightDuration, hpCollection, damageCollection, abilityCollection}) {
  // do the calculations to create a finalHpCollection
  // store the mit info and heals to be passed to Values
  return (
    <span>
      {Array(fightDuration).fill(1).map((_, index) => (<Health key={index} id={index} partyHp={hpCollection[index]}/>))}
    </span>
  )
}

// for secs
//   for each player
//     get player[index]
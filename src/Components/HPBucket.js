import React from 'react'
import Health from './Health'

const HpBucket = ({fightState}) => {
  // do the calculations to create a finalHpCollection
  // store the mit info and heals to be passed to Values
  const {fightDuration, hpCollection, damageCollection} = fightState

  const childrenAmount = Array(fightDuration).fill(1)
  const finalHpCollection = {}

  // calculates damage based on damage given but doesn't check max hp or mitigations yet
  for (let [index] of childrenAmount.entries()) {
    finalHpCollection[index] = {}
    // i = party size
    for (var i = 1; i <= 8; i++) {
      finalHpCollection[index]['Player'+i] = 0
      // first second of encounter, does not need value of prior second
      if (index !==0) {
        finalHpCollection[index]['Player'+i] = finalHpCollection[index-1]['Player'+i] - damageCollection[index]['Player'+i]
      }
      else {
        finalHpCollection[index]['Player'+i] = hpCollection[index]['Player'+i] - damageCollection[index]['Player'+i]
      }
    }
  }

  return (
    <span>
      {childrenAmount.map((_, index) => (<Health key={index} id={index} partyHp={finalHpCollection[index]} partyHpChange={damageCollection[index]}/>))}
    </span>
  )
}

export default HpBucket;
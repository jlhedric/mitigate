import React from 'react'
import Health from './Health'

const HpBucket = ({fightState}) => {
  // do the calculations to create a finalHpCollection
  // store the mit info and heals to be passed to Values
  const {fightDuration, hpCollection, damageCollection} = fightState

  const childrenAmount = Array(fightDuration).fill(1)
  const finalHpCollection = {}

  // calculates damage based on damage given but doesn't check max hp or mitigations yet
  for (let [second] of childrenAmount.entries()) {  //for each second
    finalHpCollection[second] = {}
    for (var i = 1; i <= 8; i++) {  //for each party member
      finalHpCollection[second]['Player'+i] = 0
      let totalDamagePerSec = 0
      // if this player has damage to calculate
      if(damageCollection[second]['Player'+i].length){
        for(const damage of damageCollection[second]['Player'+i]) {
          totalDamagePerSec += damage.amount
        }
      }
      if (second == 0) {
        finalHpCollection[second]['Player'+i] = hpCollection[second]['Player'+i] - totalDamagePerSec
      } else {
        finalHpCollection[second]['Player'+i] = finalHpCollection[second-1]['Player'+i] - totalDamagePerSec
      }
    }
  }

  return (
    <span>
      {childrenAmount.map((_, index) => (<Health key={index} id={index} partyHp={finalHpCollection[index]}/>))}
    </span>
  )
}

export default HpBucket;
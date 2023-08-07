import React from 'react'
import Abilities from './Abilities'
import {test_cases} from '../data'

const AbilitiesBucket = ({ fightDuration }) => {
  const childrenAmount = Array(fightDuration).fill(1)
  const abilities = Object.keys(test_cases)
  const test = abilities.map((name, _) => (childrenAmount.map((_, index) => (<Abilities key={index} name={name} />))))
  const result = childrenAmount.map((_, index) => (<Abilities key={index} />))

  return (
    <span>
      {childrenAmount.map((_, index) => (<Abilities key={index} />))}
      {/* {test.map((obj, _) => (obj))} */}
    </span>
  )
}

export default AbilitiesBucket;
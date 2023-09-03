import React,  {useState} from 'react'
import Abilities from './Abilities'

const AbilitiesBucket = ({ fightDuration, partyAttributes}) => {
  const duration = Array(fightDuration).fill(1)
  const initialState = {}
  const result = {}
  for (const player in partyAttributes){
    result[player] = {}
    partyAttributes[player]['abilities'].forEach((ability) => (result[player][ability] = {status: 'ready'}))
  }
  duration.forEach((_, second) => {
    initialState[[second]] = result
  });
  
  const [abilitiesStatus, setAbilitiesStatus] = useState(initialState)


  return (
    <span>
      {duration.map((_, second) => (<Abilities key = {second} id={second} partyAttributes={partyAttributes} abilitiesStatus={abilitiesStatus[second]}/>))}
    </span>
  )
}

export default AbilitiesBucket;
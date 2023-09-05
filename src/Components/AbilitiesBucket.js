import React,  {useState} from 'react'
import Abilities from './Abilities'
import {test_cases} from '../data'

const AbilitiesBucket = ({ fightDuration, partyAttributes, onChange}) => {
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

  const handleAbilityToggle = (caster, name, second, isToggledOn) => {
    const ability = test_cases[name]
    let effectEndsAt = second
    if ('mits' in ability && ability['mits'].length) {
      //TODO: figure out how to show different durations or pick one 'master' duration
      effectEndsAt = (second + ability['mits'][0]['duration'] < fightDuration) ? second + ability['mits'][0]['duration'] : fightDuration 
    }
    const offCooldownSecond = (second + ability['recast'] < fightDuration) ? second + ability['recast'] : fightDuration
    console.log(second, effectEndsAt, offCooldownSecond)
    
    // [second, second]: casted
    // (second, recast): cooldown
    // [second, duration]: active (if mit)
    // prio: casted > active > stacks > cooldown

    // setAbilitiesStatus((prevState) => {
    //   for(let sec = second; sec <= offCooldownSecond; sec++) {
    //     console.log(sec)
    //   }
    //   console.log('test')
    //   return {...prevState}
    // })


    // onChange();  TODO: Send fightState vals
  }

  return (
    <span>
      {duration.map((_, second) => (<Abilities key = {second} id={second} partyAttributes={partyAttributes} abilitiesStatus={abilitiesStatus[second]} abilityToggle={handleAbilityToggle}/>))}
    </span>
  )
}

export default AbilitiesBucket;
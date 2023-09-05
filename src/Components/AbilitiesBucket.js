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
      effectEndsAt = second + ability['mits'][0]['duration']
    }
    const offCooldownAt = second + ability['recast']
    // prio: casted > active > stacks > cooldown

    setAbilitiesStatus((prevState) => {
      let changes = {}
      for(let sec = second-1; sec+1 <= ((offCooldownAt <= fightDuration) ? offCooldownAt : fightDuration); sec++) {
        if(isToggledOn) {
          // TODO: stacks
          if(sec+1 < offCooldownAt) {
            changes = {...changes,
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {'status': 'cooldown'}
                }
              }
            }
          }
          if(sec+1 < effectEndsAt) {
            changes = {...changes, 
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {'status': 'active'}
                }
              }
            }
          }
          if(sec+1 === second) {
            changes = {...changes, 
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {'status': 'casted'}
                }
              }
            }
          }
        }
        else{
          if(sec+1 < offCooldownAt) {
            changes = {...changes,
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {'status': 'ready'}
                }
              }
            }
          }
        }
      }
      return {
        ...prevState, ...changes

      }
    })


    // onChange();  TODO: Send fightState vals
  }

  return (
    <span>
      {duration.map((_, second) => (<Abilities key = {second} id={second} partyAttributes={partyAttributes} abilitiesStatus={abilitiesStatus[second]} abilityToggle={handleAbilityToggle}/>))}
    </span>
  )
}

export default AbilitiesBucket;
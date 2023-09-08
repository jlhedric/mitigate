import React,  {useState} from 'react'
import Abilities from './Abilities'
import {test_cases} from '../data'

const AbilitiesBucket = ({ fightDuration, partyAttributes, onChange}) => {
  const duration = Array(fightDuration).fill(1)
  const initialState = {}
  const result = {}
  for (const player in partyAttributes){
    result[player] = {}
    partyAttributes[player]['abilities'].forEach((ability) => (result[player][ability] = {
      status: 'ready', 
      stacks: {
        maxStacks: ('stacks' in test_cases[ability]) ? test_cases[ability]['stacks'] : 1, 
        currStacks: ('stacks' in test_cases[ability]) ? test_cases[ability]['stacks'] : 1
      }
    }))
  }
  duration.forEach((_, second) => {
    initialState[[second]] = result
  });
  
  const [abilitiesStatus, setAbilitiesStatus] = useState(initialState)

  const handleAbilityToggle = (caster, name, metaData, second, isToggledOn, target) => {
    const ability = test_cases[name]
    let effectEndsAt = second 
    if ('mits' in ability && ability['mits'].length) {
      //TODO: define one 'master' duration
      effectEndsAt = second + ability['mits'][0]['duration']
    }
    const hasStacks = 'stacks' in test_cases[name]
    const offCooldownAt = second + test_cases[name]['recast'];

    // status prio: invalid > casted > active > ready > stacksAvail = cooldown
    setAbilitiesStatus((prevState) => {
      let changes = {}
      for(let sec = second-1; sec+1 <= ((offCooldownAt <= fightDuration) ? offCooldownAt : fightDuration); sec++) {
        const prevStatus = prevState[sec][caster][name]['status'];
        let numStacks = 1
        if(isToggledOn) {
          if (hasStacks) {
            numStacks = prevState[sec][caster][name]['stacks']['currStacks'] - 1
          }
          // set to stacksAvail or cooldown if not an active cast
          if(sec+1 < offCooldownAt) {
            changes = {...changes,
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {
                    'stacks': {
                      ...prevState[sec][caster][name]['stacks'],
                      'currStacks': numStacks
                    },
                    'status': (prevStatus === 'casted' || prevStatus === 'active') ? prevStatus : (numStacks > 0 && hasStacks) ? 'stacksAvail' : 'cooldown'}
                }
              }
            }
          }
          // set to active if not a stack ability or a cast, or stack/cd status otherwise
          if(sec+1 < effectEndsAt) {
            changes = {...changes, 
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {
                    'stacks': {
                      ...prevState[sec][caster][name]['stacks'],
                      'currStacks': numStacks
                    },
                    'status': (prevStatus === 'casted') ? prevStatus : (!hasStacks) ? 'active' : (numStacks > 0 && hasStacks) ? 'stacksAvail' : 'cooldown'}
                }
              }
            }
          }
          // the checkbox being selected. highest priority, shouldn't be overwritten by any other state except an error
          if(sec+1 === second) {
            changes = {...changes, 
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {
                    'stacks': {
                      ...prevState[sec][caster][name]['stacks'],
                      'currStacks': numStacks
                    },
                    'status': 'casted'}
                }
              }
            }
          }
        }
        else {
          if (hasStacks) {
            numStacks = Math.min(prevState[sec][caster][name]['stacks']['currStacks'] + 1, prevState[sec][caster][name]['stacks']['maxStacks'])
          }
          const isSeparateCast = (prevStatus === 'casted' && sec+1 !== second)
          if(sec+1 < offCooldownAt) {
            changes = {...changes,
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [name]: {
                    'stacks': {
                      ...prevState[sec][caster][name]['stacks'],
                      'currStacks': numStacks
                    },
                    'status': (isSeparateCast) ? prevStatus : (numStacks < prevState[sec][caster][name]['stacks']['maxStacks'] && hasStacks) ? 'stacksAvail' : 'ready'}
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

  const addressErrors = () => {}

  // wont be running this if max < 2
  const computeStacks = (max, curr, difference) => {
    return Math.min(curr + difference, max)
  }

  return (
    <span>
      {duration.map((_, second) => (<Abilities key = {second} id={second} partyAttributes={partyAttributes} abilitiesStatus={abilitiesStatus[second]} abilityToggle={handleAbilityToggle}/>))}
    </span>
  )
}

export default AbilitiesBucket;
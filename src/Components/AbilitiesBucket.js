import React,  {useState} from 'react'
import Abilities from './Abilities'
import {test_cases} from '../data'

const AbilitiesBucket = ({ fightDuration, partyAttributes, onChange}) => {
  const duration = Array(fightDuration).fill(1)
  const initialState = {}
  let initialResult = {}
  // builds the initial state of ability checkboxes
  for (const player in partyAttributes){
    initialResult[player] = {}
    partyAttributes[player]['abilities'].forEach((ability) => (initialResult[player][ability] = {
      status: 'ready', 
      stacks: {
        maxStacks: ('stacks' in test_cases[ability]) ? test_cases[ability]['stacks'] : 1, 
        currStacks: ('stacks' in test_cases[ability]) ? test_cases[ability]['stacks'] : 1
      }
    }))
  }
  duration.forEach((_, second) => {
    initialState[[second]] = initialResult
  });
  
  const [abilitiesStatus, setAbilitiesStatus] = useState(initialState)

  const handleAbilityToggle = (caster, name, metaData, startingSecond, isToggledOn, targets) => {
    const ability = test_cases[name]
    let effectEndsAt = startingSecond 
    if ('mits' in ability && ability['mits'].length) {
      effectEndsAt = startingSecond + ability['duration']
    }
    const hasStacks = 'stacks' in test_cases[name]
    const offCooldownAt = startingSecond + test_cases[name]['recast'];

    // status prio: invalid > casted > active > ready > stacksAvail = cooldown
    setAbilitiesStatus((prevState) => {
      let changes = {}
      for(let sec = startingSecond-1; sec+1 <= ((offCooldownAt <= fightDuration) ? offCooldownAt : fightDuration); sec++) {
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
          if(sec+1 === startingSecond) {
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
          const isSeparateCast = (prevStatus === 'casted' && sec+1 !== startingSecond)
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

    let result = {}

    if (isToggledOn) {
      const commonAbilityAttrs = {
        'castSecond': startingSecond-1,
        'castBy': caster
      }
  
      let maxEffect = 0
      for(const buff of [ability['heals'], ability['mits'], ability['shields']].flat()) {
        if(buff['duration'] > maxEffect) maxEffect = buff['duration']
      }
      // so we only have to iterate through the seconds once even with multiple buff timers
      const effectedSeconds = Array.from({length: maxEffect}, (_, i) => i + startingSecond);
  
      for(let sec of effectedSeconds) {
        // TODO: DYNAMIC PARTY SIZE
        result[sec] = { 'Player1': {}, 'Player2': {}, 'Player3': {}, 'Player4': {}, 'Player5': {}, 'Player6': {}, 'Player7': {}, 'Player8': {} }
        if('heals' in ability) {
          for(const heal of ability['heals']) {
            const buffTargetType = heal['target']
            const buffTargets = []
            if(sec < heal['duration'] + startingSecond) {
              if(buffTargetType === 'self') {
                result[sec][caster]
              }
              if(buffTargetType === 'single') {

              }
              if(buffTargetType === 'partner') {

              }
              if(buffTargetType === 'all') {

              }
              if(buffTargetType === 'ally') {

              }
              if(buffTargetType === 'allies') {
                
              }
            }
          }
        }
        if('mits' in ability) {
          for(const mit of ability['mits']) {
            const buffTargetType = mit['target']
            if(sec < mit['duration'] + startingSecond) console.log(mit, sec)
          }
        }
        if('shields' in ability) {
          for(const shield of ability['shields']) {
            const buffTargetType = shield['target']
            if(sec < shield['duration'] + startingSecond) console.log(shield, sec)
          }
        }
      }

    }
    


    onChange(caster, ability, startingSecond, isToggledOn, targets);
  }

  const addressErrors = () => {}



  return (
    <span>
      {duration.map((_, second) => (<Abilities key = {second} id={second} partyAttributes={partyAttributes} abilitiesStatus={abilitiesStatus[second]} abilityToggle={handleAbilityToggle}/>))}
    </span>
  )
}

export default AbilitiesBucket;
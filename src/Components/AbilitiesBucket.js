import React,  {useState} from 'react'
import Abilities from './Abilities'
import {test_cases} from '../data'

const AbilitiesBucket = ({ fightDuration, partyAttributes, onChange}) => {
  const duration = Array(fightDuration).fill(1)
  const players = Object.keys(partyAttributes)
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

  const handleAbilityToggle = (caster, abilityName, startingSecond, isToggledOn, targets) => {
    // flatten out the buffs an ability gives
    const combineBuffs = (...arrays) => [].concat(...arrays.filter(Array.isArray));

    // figure out the target of a specific buff and return an array of names
    const defineTargets = (caster, buffTargetType, targets) => {
      const buffTargets = []
      if(buffTargetType === 'self') {
        buffTargets.push(caster)
      }
      if(['single', 'ally', 'partner'].includes(buffTargetType)) {
        buffTargets.push(targets[0])
      }
      if(buffTargetType === 'partner') {
        buffTargets.push(caster)
      }
      if(buffTargetType === 'all') {
        buffTargets.push(...players)
      }
      if(buffTargetType === 'allies') {
        buffTargets.push(...players.filter((player) => player !== caster))
      }
      return buffTargets
    }

    const buildResultByBuffType = (buffType, ability, startingSecond, currSecond, result) => {
      /**
       * Builds a result object with the buffs of a specific type.
       *
       * @param {string} buffType - The type of buffs to process. The types are: heals, mits, shields.
       * @param {Object} ability - The ability object containing the buff information.
       * @param {number} startingSecond - The starting second of the ability's effects.
       * @param {number} currSecond - The current second of THE FIGHT.
       * @param {Object} result - The result object to update with the processed buffs.
       */
      if (buffType in ability) {
        for (const buff of ability[buffType]) {
          if (currSecond < buff['duration'] + startingSecond) {
            const buffTargets = defineTargets(caster, buff['target'], targets);
            for (const target of buffTargets) {
              if (target in result[currSecond - 1]) {
                if (buffType in result[currSecond - 1][target][abilityName]) {
                  result[currSecond - 1][target][abilityName][buffType].push(buff);
                } else {
                  result[currSecond - 1][target][abilityName][buffType] = [buff];
                }
              } else {
                result[currSecond - 1][target] = {
                  [abilityName]: {
                    'castSecond': startingSecond-1, // is this needed?
                    'castBy': caster,
                    [buffType]: [buff]
                  },
                };
              }
            }
          }
        }
      }
    }

    const ability = test_cases[abilityName]
    let effectEndsAt = startingSecond 
    if ('mits' in ability && ability['mits'].length) {
      effectEndsAt = startingSecond + ability['duration']
    }
    const hasStacks = 'stacks' in test_cases[abilityName]
    const offCooldownAt = startingSecond + test_cases[abilityName]['recast'];

    // status prio: invalid > casted > active > ready > stacksAvail = cooldown
    setAbilitiesStatus((prevState) => {
      let changes = {}
      for(let sec = startingSecond-1; sec+1 <= ((offCooldownAt <= fightDuration) ? offCooldownAt : fightDuration); sec++) {
        const prevStatus = prevState[sec][caster][abilityName]['status'];
        let numStacks = 1
        if(isToggledOn) {
          if (hasStacks) {
            numStacks = prevState[sec][caster][abilityName]['stacks']['currStacks'] - 1
          }
          // set to stacksAvail or cooldown if not an active cast
          if(sec+1 < offCooldownAt) {
            changes = {...changes,
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [abilityName]: {
                    'stacks': {
                      ...prevState[sec][caster][abilityName]['stacks'],
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
                  [abilityName]: {
                    'stacks': {
                      ...prevState[sec][caster][abilityName]['stacks'],
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
                  [abilityName]: {
                    'stacks': {
                      ...prevState[sec][caster][abilityName]['stacks'],
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
            numStacks = Math.min(prevState[sec][caster][abilityName]['stacks']['currStacks'] + 1, prevState[sec][caster][abilityName]['stacks']['maxStacks'])
          }
          const isSeparateCast = (prevStatus === 'casted' && sec+1 !== startingSecond)
          if(sec+1 < offCooldownAt) {
            changes = {...changes,
              [sec]: {
                ...prevState[sec],
                [caster]: {
                  ...prevState[sec][caster],
                  [abilityName]: {
                    'stacks': {
                      ...prevState[sec][caster][abilityName]['stacks'],
                      'currStacks': numStacks
                    },
                    'status': (isSeparateCast) ? prevStatus : (numStacks < prevState[sec][caster][abilityName]['stacks']['maxStacks'] && hasStacks) ? 'stacksAvail' : 'ready'}
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
    let maxEffect = 0
    const buffArray = combineBuffs(ability['heals'], ability['mits'], ability['shields'])
    for(const buff of buffArray) {
      if(buff['duration'] > maxEffect) maxEffect = buff['duration']
      if(maxEffect + startingSecond > fightDuration) {
        maxEffect = fightDuration - startingSecond + 1;
        break;
      }
    }
    maxEffect = Math.min(maxEffect, fightDuration)
    // so we only have to iterate through the seconds once even with multiple buff timers
    const effectedSeconds = Array.from({length: maxEffect}, (_, i) => i + startingSecond);
    for(let sec of effectedSeconds) {
      result[sec-1] = {}
      if(isToggledOn) {
        buildResultByBuffType('heals', ability, startingSecond, sec, result);
        buildResultByBuffType('mits', ability, startingSecond, sec, result);
        buildResultByBuffType('shields', ability, startingSecond, sec, result);
      }
      else {
        // hack: cannot get target info upon deselection so just remove it from 'everyone'
        players.map((player) =>(result[sec-1][player] = {
          [abilityName]: {
            'castSecond': startingSecond-1,
            'castBy': caster
          }
        }));
      }
    }
    onChange(caster, isToggledOn, result);
  }

  const addressErrors = () => {}



  return (
    <span>
      {duration.map((_, second) => (<Abilities key = {second} id={second} partyAttributes={partyAttributes} abilitiesStatus={abilitiesStatus[second]} abilityToggle={handleAbilityToggle}/>))}
    </span>
  )
}

export default AbilitiesBucket;
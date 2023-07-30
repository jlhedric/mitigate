import React, {useState} from 'react'
import {DAMAGE_TYPES} from '../data'
import AbilitiesBucket from './AbilitiesBucket'
import Damage from './Damage'
import HpBucket from './HpBucket'

const tempDefaultAttack = {'amount': 2, 'type': 'physical', 'isDotTick': false, 'isTargetable': false}
const tempNoAttack = {'amount': 0, 'type': 'physical', 'isDotTick': false, 'isTargetable': false}
const tempDefaultHpJson = {'Player1': 1500, 'Player2': 10, 'Player3': 10, 'Player4': 10, 'Player5': 10, 'Player6': 10, 'Player7': 10, 'Player8': 10}
const tempDefaultDamageJson = {'Player1': [tempDefaultAttack], 'Player2':[tempNoAttack], 'Player3': [tempNoAttack], 'Player4': [tempNoAttack], 'Player5': [tempNoAttack], 'Player6': [tempNoAttack], 'Player7': [tempNoAttack], 'Player8': [tempNoAttack]}

const Timeline = () => {
  const [fightState, setFightState] = useState({
    'fightDuration': 3, 
    'hpCollection': {
      0: tempDefaultHpJson, 
      1: tempDefaultHpJson, 
      2: tempDefaultHpJson
    },
    'damageCollection': {
      0: tempDefaultDamageJson,
      1: tempDefaultDamageJson,
      2: tempDefaultDamageJson
    }
  })

  const abilitiesJson = {}

  for (var i = 0; i < fightState['fightDuration']; i++) {
    abilitiesJson[i]= {'Player1':[{'Mit':[], 'Heal': 0}], 'Player2':[{'Mit':[], 'Heal':0}]}
  }
  const [abilityCollection, setAbilityCollection] = useState(abilitiesJson)
  
  const handleDurationSubmit = (e) => {
    e.preventDefault();
    let duration =  Number(Object.fromEntries(new FormData(e.target).entries())['durationInSeconds'])
    if(!isNaN(duration) && duration > 0){
      duration = Math.floor(duration)
      const hpCollection = {}
      const damageCollection = {}
      for (var i = 0; i < duration; i++) {
        hpCollection[i] = tempDefaultHpJson
        damageCollection[i] = tempDefaultDamageJson
      }
      setFightState({'fightDuration': duration, 'hpCollection': hpCollection, 'damageCollection': damageCollection})
    }
};
  // TODO: Apply damage to specific targets
  const handleAddDamageSubmit = (e) => {
    e.preventDefault();
    const index = Number(e.target.id)
    let newDamage =  Number(Object.fromEntries(new FormData(e.target).entries())['AddDamageAtSec'+(index+1)])   //seconds are 1 indexed
    if(!isNaN(newDamage) && newDamage > 0){
      newDamage = Math.floor(newDamage)
      setFightState(prevState => ({
        ...prevState,
        damageCollection: {
          ...prevState.damageCollection,
          [index]: {
            'Player1': prevState.damageCollection[index].Player1 + newDamage,
            'Player2': prevState.damageCollection[index].Player2 + newDamage,
            'Player3': prevState.damageCollection[index].Player3 + newDamage,
            'Player4': prevState.damageCollection[index].Player4 + newDamage,
            'Player5': prevState.damageCollection[index].Player5 + newDamage,
            'Player6': prevState.damageCollection[index].Player6 + newDamage,
            'Player7': prevState.damageCollection[index].Player7 + newDamage,
            'Player8': prevState.damageCollection[index].Player8 + newDamage
          }
        }

      }))
    }

  }

  const childrenAmount = Array(fightState['fightDuration']).fill(1)

  return ( 
    <div>
      <form onSubmit={handleDurationSubmit}>
        <label>Fight Duration In Seconds: </label>
        <input 
          name="durationInSeconds"
          placeholder='Fight duration in seconds'/>
        <button type='submit'>Submit</button>
      </form>
      {childrenAmount.map((_, index) => (
        <Damage 
          key={index} 
          id={index} 
          damageAtSec={fightState['damageCollection'][index]} 
          onSubmit={handleAddDamageSubmit}
        />))}
      <br/>
      <br/>
      <AbilitiesBucket fightDuration={fightState['fightDuration']}/>
      <br/>
      <HpBucket fightState={fightState}/>
    </div>
  )
}

export default Timeline;
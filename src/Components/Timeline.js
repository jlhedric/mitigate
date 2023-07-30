import React, {useState} from 'react'
import AbilitiesBucket from './AbilitiesBucket'
import Damage from './Damage'
import HpBucket from './HpBucket'

const tempDefaultAttack = {'name': 'demoAttack', 'amount': 2, 'type': 'physical', 'isDotTick': false, 'isTargetable': false}
const tempDefaultHpJson = {'Player1': 1500, 'Player2': 10, 'Player3': 10, 'Player4': 10, 'Player5': 10, 'Player6': 10, 'Player7': 10, 'Player8': 10}
const tempDefaultDamageJson = {'Player1': [tempDefaultAttack, tempDefaultAttack], 'Player2':[tempDefaultAttack], 'Player3': [], 'Player4': [], 'Player5': [], 'Player6': [], 'Player7': [], 'Player8': []}

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

  const handleAddDamageSubmit = (e) => {
    e.preventDefault();
    const index = Number(e.target.id)
    const damageFormInput = Object.fromEntries(new FormData(e.target).entries())
    const {type} = damageFormInput
    let newDamage =  Number(damageFormInput.amount)
    if(!isNaN(newDamage) && newDamage > 0){
      newDamage = Math.floor(newDamage)

      const newDamageObj = {
        'name': damageFormInput.name ? damageFormInput.name : `DefaultNameSec${index+1}_${Date.now()}`,
        'amount': newDamage,
        type, 
        'isDotTick': 'isDotTick' in damageFormInput, 
        'isTargetable': 'isTargetable' in damageFormInput
      }
    
      setFightState(prevState => ({
        ...prevState,
        damageCollection: {
          ...prevState.damageCollection,
          [index]: {
            'Player1': damageFormInput.Player1 ? [...prevState.damageCollection[index].Player1, newDamageObj] : [...prevState.damageCollection[index].Player1],
            'Player2': damageFormInput.Player2 ? [...prevState.damageCollection[index].Player2, newDamageObj] : [...prevState.damageCollection[index].Player2],
            'Player3': damageFormInput.Player3 ? [...prevState.damageCollection[index].Player3, newDamageObj] : [...prevState.damageCollection[index].Player3],
            'Player4': damageFormInput.Player4 ? [...prevState.damageCollection[index].Player4, newDamageObj] : [...prevState.damageCollection[index].Player4],
            'Player5': damageFormInput.Player5 ? [...prevState.damageCollection[index].Player5, newDamageObj] : [...prevState.damageCollection[index].Player5],
            'Player6': damageFormInput.Player6 ? [...prevState.damageCollection[index].Player6, newDamageObj] : [...prevState.damageCollection[index].Player6],
            'Player7': damageFormInput.Player7 ? [...prevState.damageCollection[index].Player7, newDamageObj] : [...prevState.damageCollection[index].Player7],
            'Player8': damageFormInput.Player8 ? [...prevState.damageCollection[index].Player8, newDamageObj] : [...prevState.damageCollection[index].Player8],
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
      <br/>
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
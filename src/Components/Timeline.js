import React, { useState } from 'react'
import AbilitiesBucket from './AbilitiesBucket'
import Damage from './Damage'
import HpBucket from './HpBucket'
import PartyModal from './PartyModal'
import { JOBS } from '../data'

const tempDefaultAttack = { 'name': 'demoAttack', 'amount': 2, 'type': 'physical', 'isDotTick': false, 'isTargetable': false, 'id': 123 }
const tempSecondDefaultAttack = { 'name': 'demoAttack2', 'amount': 3, 'type': 'physical', 'isDotTick': false, 'isTargetable': false, 'id': 456 }

const tempDefaultHpJson = { 'Player1': 1500, 'Player2': 10, 'Player3': 10, 'Player4': 10, 'Player5': 10, 'Player6': 10, 'Player7': 10, 'Player8': 10 }
const tempDefaultDamageJson = { 'Player1': [tempDefaultAttack, tempSecondDefaultAttack], 'Player2': [tempDefaultAttack], 'Player3': [tempSecondDefaultAttack], 'Player4': [], 'Player5': [], 'Player6': [], 'Player7': [], 'Player8': [] }

const tempDefaultAbilities = { 'Player1': [], 'Player2': [], 'Player3': [], 'Player4': [], 'Player5': [], 'Player6': [], 'Player7': [], 'Player8': [] }
// need to send the caster and ability name

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
    },
    'abilitiesCollection': {
      0: tempDefaultAbilities,
      1: tempDefaultAbilities,
      2: tempDefaultAbilities
    },
    'partyAttributes': {
      'Player1': { 'job': 'drk', 'abilities': JOBS['drk'], 'lvl': 90, 'maxhp': 1500, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 },
      'Player2': { 'job': 'pld', 'abilities': JOBS['pld'], 'lvl': 90, 'maxhp': 10, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 },
      'Player3': { 'job': 'whm', 'abilities': JOBS['whm'], 'lvl': 90, 'maxhp': 10, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 },
      'Player4': { 'job': 'sge', 'abilities': JOBS['sge'], 'lvl': 90, 'maxhp': 10, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 },
      'Player5': { 'job': 'smn', 'abilities': JOBS['smn'], 'lvl': 90, 'maxhp': 10, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 },
      'Player6': { 'job': 'blm', 'abilities': JOBS['blm'], 'lvl': 90, 'maxhp': 10, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 },
      'Player7': { 'job': 'rpr', 'abilities': JOBS['rpr'], 'lvl': 90, 'maxhp': 10, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 },
      'Player8': { 'job': 'dnc', 'abilities': JOBS['dnc'], 'lvl': 90, 'maxhp': 10, 'physDef': 0, 'magicDef': 0, 'det': 0, 'tenacity': 0, 'mind': 0, 'healMagPotency': 0 }
    }
  })

  const handleDurationSubmit = (e) => {
    e.preventDefault();
    let duration = Number(Object.fromEntries(new FormData(e.target).entries())['durationInSeconds'])
    if (!isNaN(duration) && duration > 0) {
      duration = Math.floor(duration)
      const hpCollection = {}
      const damageCollection = {}
      const abilitiesCollection = {}
      for (let i = 0; i < duration; i++) {
        hpCollection[i] = tempDefaultHpJson
        damageCollection[i] = tempDefaultDamageJson
        abilitiesCollection[i] = { 'Player1': [], 'Player2': [], 'Player3': [], 'Player4': [], 'Player5': [], 'Player6': [], 'Player7': [], 'Player8': [] }
      }
      setFightState((prevState) => ({ 'fightDuration': duration, 'hpCollection': hpCollection, 'damageCollection': damageCollection, 'abilitiesCollection': abilitiesCollection, 'partyAttributes': prevState.partyAttributes }))
    }
  };

  const handleCreatePartySubmit = (e) => {
    e.preventDefault();
    console.log('boop')
  }

  const handleAddDamageSubmit = (e) => {
    e.preventDefault();
    const index = Number(e.target.id)
    const damageFormInput = Object.fromEntries(new FormData(e.target).entries())
    let newDamage = Number(damageFormInput.amount)
    if (!isNaN(newDamage) && newDamage > 0) {
      newDamage = Math.floor(newDamage)

      const newDamageObj = {
        'name': damageFormInput.name ? damageFormInput.name : `DefaultNameSec${index + 1}_${Date.now()}`,
        'amount': newDamage,
        'type': damageFormInput.type,
        'isDotTick': 'isDotTick' in damageFormInput,
        'isTargetable': 'isTargetable' in damageFormInput,
        'id': Date.now()
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

  const handleAbilityToggle = (e) => {
    console.log('beep')
    // const index = Number(e.target.id)
    // const abilityFormInput = Object.fromEntries(new FormData(e.target).entries())
    //   const newAbilityObj = {
    //   }


    // setFightState(prevState => ({
    //   ...prevState,
    //   abilitiesCollection: {
    //     ...prevState.abilitiesCollection,
    //     [index]: {
    //       'Player1': abilityFormInput.Player1 ? [...prevState.abilitiesCollection[index].Player1, newAbilityObj] : [...prevState.abilitiesCollection[index].Player1],
    //       'Player2': abilityFormInput.Player2 ? [...prevState.abilitiesCollection[index].Player2, newAbilityObj] : [...prevState.abilitiesCollection[index].Player2],
    //       'Player3': abilityFormInput.Player3 ? [...prevState.abilitiesCollection[index].Player3, newAbilityObj] : [...prevState.abilitiesCollection[index].Player3],
    //       'Player4': abilityFormInput.Player4 ? [...prevState.abilitiesCollection[index].Player4, newAbilityObj] : [...prevState.abilitiesCollection[index].Player4],
    //       'Player5': abilityFormInput.Player5 ? [...prevState.abilitiesCollection[index].Player5, newAbilityObj] : [...prevState.abilitiesCollection[index].Player5],
    //       'Player6': abilityFormInput.Player6 ? [...prevState.abilitiesCollection[index].Player6, newAbilityObj] : [...prevState.abilitiesCollection[index].Player6],
    //       'Player7': abilityFormInput.Player7 ? [...prevState.abilitiesCollection[index].Player7, newAbilityObj] : [...prevState.abilitiesCollection[index].Player7],
    //       'Player8': abilityFormInput.Player8 ? [...prevState.abilitiesCollection[index].Player8, newAbilityObj] : [...prevState.abilitiesCollection[index].Player8],
    //     }
    //   }
    // }))
  }

  const childrenAmount = Array(fightState['fightDuration']).fill(1)

  return (
    <div>
      <form onSubmit={handleDurationSubmit}>
        <label>Fight Duration In Seconds: </label>
        <input
          name="durationInSeconds"
          placeholder='Fight duration in seconds' />
        <button type='submit'>Submit</button>
      </form>
      <br />
      <PartyModal onSubmit={handleCreatePartySubmit} />
      <br />
      <br />
      {childrenAmount.map((_, index) => (
        <Damage
          key={index}
          id={index}
          damagesAtSec={fightState['damageCollection'][index]}
          onSubmit={handleAddDamageSubmit}
        />))}
      <br />
      <br />
      <AbilitiesBucket
        fightDuration={fightState['fightDuration']}
        partyAttributes={fightState['partyAttributes']}
        onChange={handleAbilityToggle
        } />
      <br />
      <HpBucket fightState={fightState} />
    </div>
  )
}

export default Timeline;
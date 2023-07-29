import React, {useState} from 'react'
import AbilitiesBucket from './AbilitiesBucket'
import Damage from './Damage'
import HpBucket from './HpBucket'

// //https://stackoverflow.com/questions/60657796/prevent-multiple-form-submissions-in-reactjs
// const useCallbackOnce = (cb) => {
//     const [called, setCalled] = useState(false);
//     // Below can be wrapped in useCallback whenever re-renders becomes a problem
//     return (e) => {
//         if (!called) {
//             setCalled(true);
//             cb(e);
//         }
//     }
// }

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

const Timeline = () => {
  const [fightState, setFightState] = useState(
    {'fightDuration': 3, 
    'hpCollection': {
      0:{
        'Player1': 1500, 'Player2': 10, 'Player3': 10, 'Player4': 10, 'Player5': 10, 'Player6': 10, 'Player7': 10, 'Player8': 10
      }, 1:{
        'Player1': 1500, 'Player2': 10, 'Player3': 10, 'Player4': 10, 'Player5': 10, 'Player6': 10, 'Player7': 10, 'Player8': 10
      }, 2:{
        'Player1': 1500, 'Player2': 10, 'Player3': 10, 'Player4': 10, 'Player5': 10, 'Player6': 10, 'Player7': 10, 'Player8': 10
      }
    },
    'damageCollection': {
      0:{'Player1':2, 'Player2':0, 'Player3': 0, 'Player4': 0, 'Player5': 0, 'Player6': 0, 'Player7': 0, 'Player8': 0},
      1:{'Player1':2, 'Player2':0, 'Player3': 0, 'Player4': 0, 'Player5': 0, 'Player6': 0, 'Player7': 0, 'Player8': 0},
      2:{'Player1':2, 'Player2':0, 'Player3': 0, 'Player4': 0, 'Player5': 0, 'Player6': 0, 'Player7': 0, 'Player8': 0}
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
        hpCollection[i] = {'Player1': 1500, 'Player2': 10, 'Player3': 10, 'Player4': 10, 'Player5': 10, 'Player6': 10, 'Player7': 10, 'Player8': 10}
        damageCollection[i] = {'Player1':2, 'Player2':0, 'Player3': 0, 'Player4': 0, 'Player5': 0, 'Player6': 0, 'Player7': 0, 'Player8': 0}
      }
      setFightState({'fightDuration': duration, 'hpCollection': hpCollection, 'damageCollection': damageCollection})
    }
  };

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
      {childrenAmount.map((_, index) => (<Damage key={index} id={index} damageCollection={fightState['damageCollection'][index]} />))}
      <br/>
      <br/>
      <AbilitiesBucket fightDuration={fightState['fightDuration']}/>
      <br/>
      <HpBucket fightState={fightState}/>
    </div>
  )
}

export default Timeline;
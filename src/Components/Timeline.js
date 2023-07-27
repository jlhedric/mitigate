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
  const [fightDuration, setFightDuration] = useState(3)

  const hpJson = {}
  for (var i = 0; i < fightDuration; i++) {
    hpJson[i] = {'Player1': 30, 'Player2': 10}
  }
  const [hpCollection, setHpCollection] = useState(hpJson)
  const [damageCollection, setDamageCollection] = useState({
    'Player1': [0, -10, -10],
    'Player2': [0, -2, -2]
  })
  const [abilityCollection, setAbilityCollection] = useState({
    // 10% mit to P1 at sec 2 and 3
    'Player1':[{'Mit':[0, 0, 0], 'Heal': [0,0,0] }, {'Mit':[0, 0.1, 0.1], 'Heal': [0,0,0] }, {'Mit':[0, 0.1, 0.1], 'Heal': [0,0,0] }],
    'Player2':[{'Mit':[0, 0, 0], 'Heal': [0,0,0] }, {'Mit':[0, 0, 0], 'Heal': [0,0,0] }, {'Mit':[0, 0, 0], 'Heal': [0,0,0] }]
  })
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const value =  Number(Object.fromEntries(new FormData(e.target).entries())['durationInSeconds'])
    if(!isNaN(value) && value > 0){
      setFightDuration(value)
    }
  };

  const childrenAmount = Array(fightDuration).fill(1)

  return ( 
    <div>
      <form onSubmit={handleSubmit}>
        <label>Fight Duration In Seconds: </label>
        <input 
          name="durationInSeconds"
          placeholder='Fight duration in seconds'/>
        <button type='submit'>Submit</button>
      </form>
      {childrenAmount.map((_, index) => (<Damage key={index} id={index}/>))}
      <br/>
      <AbilitiesBucket fightDuration={fightDuration}/>
      <br/>
      <HpBucket fightDuration={fightDuration} hpCollection={hpCollection} damageCollection={damageCollection} abilityCollection={abilityCollection}/>
    </div>
  )
}

export default Timeline;
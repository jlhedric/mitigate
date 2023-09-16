import React from 'react'

//self, single, all, partner, anyButSelf, allButSelf


const AbilityModalContent = ({ onClose, partyAttributes, caster, name, targetType, onSubmit}) => {
  const players = Object.keys(partyAttributes)

  const TargetInput = () => {
    if(targetType === 'single') {
      return (
        players.map((player) => (
          <label key={player}>{partyAttributes[player]['job']} 
            <input 
              type='radio' 
              name='abilityTarget'
              defaultChecked={false} />
          </label>
        ))
      )
    }
    else {
      return (
        players.map((player) => {
          if (player === caster) {
            return (
              <label key={player}>{partyAttributes[player]['job']} 
                <input 
                  type='radio' 
                  name='self' 
                  defaultChecked={(targetType === 'partner')}
                  value={player}
                  disabled
                />
              </label>
            )
          }
          else {
            return (
              <label key={player}>{partyAttributes[player]['job']} 
                <input 
                  type='radio' 
                  name='abilityTarget'  
                  defaultChecked={false}
                  value={player}
                />
              </label>
            )
          }
        })
      )
    }
  }
  return (
      <div className='modal'>
        <form onSubmit={onSubmit}>
          <div>
            Target of {name}<br></br>
              <span>
              <TargetInput/>
            </span>
          </div>
          <button type='submit'>Submit</button>
          <button onClick={onClose}>Close</button>
        </form>
        
      </div>
  );
}

export default AbilityModalContent;
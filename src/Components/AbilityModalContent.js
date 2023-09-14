import React from 'react'

//self, single, all, partner, anyButSelf, allButSelf


const AbilityModalContent = ({ onClose, partyAttributes, caster, name, targetType, onSubmit}) => {
  const players = Object.keys(partyAttributes)

  const TargetInput = () => {
    // TODO: figure out target counts? also how to set caster as immutable option
    if(targetType === 'partner') {
      return (
        players.map((player) => {
          if (player === caster) {
            return (
              <label key={player}>{partyAttributes[player]['job']} 
                <input 
                  type='checkbox' 
                  name={caster} 
                  defaultChecked={true}
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
                  name={caster} 
                  defaultChecked={false}
                />
              </label>
            )
          }
        })
      )
    }
    if(targetType === 'anyButSelf') {
      return (
        players.map((player) => {
          if (player === caster) {
            return (
              <label key={player}>{partyAttributes[player]['job']} 
                <input 
                  type='radio' 
                  name={caster} 
                  defaultChecked={false}
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
                  name={caster} 
                  defaultChecked={false}
                />
              </label>
            )
          }
        })
      )
    }
    if(targetType === 'single') {
      return (
        players.map((player) => (
          <label key={player}>{partyAttributes[player]['job']} 
            <input 
              type='radio' 
              name={caster} 
              defaultChecked={false}/>
          </label>
        ))
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
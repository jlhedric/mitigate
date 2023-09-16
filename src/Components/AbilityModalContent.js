import React from 'react'

//self, single, all, partner, anyButSelf, allButSelf


const AbilityModalContent = ({ onClose, partyAttributes, caster, name, targetType, onSubmit}) => {
  let initialVal = new Set();
  if(['self', 'partner'].includes(targetType)) {
    initialVal.add(caster)
  }
  const [targetList, setTargetList] = React.useState(initialVal)
  const players = Object.keys(partyAttributes)

  const handleChange = (e) => {
    const target = e.target.name
    setTargetList((prevState) => {
      let newTargets = prevState
      // newTargets.add(target) ? e.target.checked : newTargets.delete(target) DOESNT WORK FOR SINGLE
      return newTargets
    })
  };

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
                  name={player} 
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
                  name={player} 
                  defaultChecked={false}
                  onChange={handleChange}
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
                  name={player} 
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
                  name={player} 
                  defaultChecked={false}
                  onChange={handleChange}
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
              name='targets'
              defaultChecked={false}
              onChange={handleChange}/>
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
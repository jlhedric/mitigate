import React from 'react'



const AbilityModalContent = ({ onClose, partyAttributes, caster, name, targetType, onSubmit}) => {
  const players = Object.keys(partyAttributes)
  return (
      <div className='modal'>
        <form onSubmit={onSubmit}>
          <div>
            Targets<br></br>
              <span>
              {players.map((player) => (
                <label>{partyAttributes[player]['job']} <input type='checkbox' name={player} defaultChecked={false}/></label>
              ))}
            </span>
          </div>
          <button type='submit'>Submit</button>
          <button onClick={onClose}>Close</button>
        </form>
        
      </div>
  );
}

export default AbilityModalContent;
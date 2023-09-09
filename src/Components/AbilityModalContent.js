import React from 'react'


const AbilityModalContent = ({ onClose, id, onSubmit}) => {
  return (
      <div className='modal'>
        <form onSubmit={onSubmit} id={id}>
          <div>
            Targets<br></br>
              <span>
              <label>Player1 <input type='checkbox' name='Player1' defaultChecked={false}/></label>
              <label>Player2 <input type='checkbox' name='Player2' defaultChecked={false}/></label>
              <label>Player3 <input type='checkbox' name='Player3' defaultChecked={false}/></label>
              <label>Player4 <input type='checkbox' name='Player4' defaultChecked={false}/></label>
              <label>Player5 <input type='checkbox' name='Player5' defaultChecked={false}/></label>
              <label>Player6 <input type='checkbox' name='Player6' defaultChecked={false}/></label>
              <label>Player7 <input type='checkbox' name='Player7' defaultChecked={false}/></label>
              <label>Player8 <input type='checkbox' name='Player8' defaultChecked={true}/></label>
            </span>
          </div>
          <button type='submit'>Submit</button>
          <button onClick={onClose}>Close</button>
        </form>
        
      </div>
  );
}

export default AbilityModalContent;
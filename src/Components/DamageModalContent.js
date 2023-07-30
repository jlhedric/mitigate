import React from 'react'


const DamageModalContent = ({ onClose, id, onSubmit, setShowModel }) => {
  return (
      <div className='modal'>
        <form onSubmit={onSubmit} id={id}>
          Add a new source of damage for second {id+1}
          <br/>
          <br/>
          <label>Damage Name </label>
          <input name={`name`} placeholder='ex: Limit Cut #7s' autoFocus/>
          <br/>
          <label>Damage </label>
          <input name={`amount`} placeholder='Raw damage' inputMode='numeric' required/>
          <br/>
          Damage Type
          <label>
            <input type='radio' name='type' value='physical' required defaultChecked/>
            Physical
          </label>
          <label>
            <input type="radio" name='type' value='magical' required/>
            Magical
          </label>
          <label>
            <input type="radio" name='type' value='special' required/>
            Special
          </label>
          <br/>
          <div>
            Targets
              {/* TODO: Dynamic Party Size */}
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
          <div>
            <label>Is this a DOT Tick?<input type='checkbox' name='isDotTick' defaultChecked={false}/></label>
          </div>
          <div>
            <label>Can the source of damage be debuffed? <input type='checkbox' name='isTargetable' defaultChecked={true}/></label>
          </div>
          <button type='submit'>Submit</button>
          <button onClick={onClose}>Close</button>
        </form>
        
      </div>
  );
}

export default DamageModalContent;
import React, {useState} from 'react'
// REMEMBER. DAMAGE IS -ALL- SOURCES OF DAMAGE A SECOND. 

const Damage = ({id, damageAtSec, onSubmit}) => {
  const [damageThisSecond, setDamageThisSecond] = useState({});


  return (
    <React.Fragment>
      <span>Sec {id+1} &nbsp;</span>
      <form onSubmit={onSubmit} id={id}>
        <label>Damage </label>
        <input 
          name={`AddDamageAtSec${id+1}`}
          placeholder='Raw damage'/>
        <button type='submit'>Add Damage</button>
      </form>
    </React.Fragment>
  )
}

export default Damage;
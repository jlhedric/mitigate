import React, {useState} from 'react'
// REMEMBER. DAMAGE IS -ALL- SOURCES OF DAMAGE A SECOND. 

const Damage = ({id, damageCollection, onSubmit}) => {
  const [damageThisSecond, setDamageThisSecond] = useState("");



  return (
    <React.Fragment>
      <span>Sec {id+1} &nbsp;</span>
      <form>
        <label>Damage </label>
        <input 
          name={`DamageAtSec${id+1}`}
          placeholder='Raw damage'/>
        <button type='submit'>Submit</button>
      </form>
    </React.Fragment>
  )
}

export default Damage;
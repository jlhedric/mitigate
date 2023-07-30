import React, {useState} from 'react'
import DamageModal from './DamageModal';

// REMEMBER. DAMAGE IS -ALL- SOURCES OF DAMAGE A SECOND. 

const Damage = ({id, damageAtSec, onSubmit}) => {
  const [damageThisSecond, setDamageThisSecond] = useState({});

  return (
    <React.Fragment>
      <span>Sec {id+1} &nbsp;</span>
      <DamageModal id={id} onSubmit={onSubmit}/>
      &nbsp;
    </React.Fragment>
  )
}

export default Damage;
import React, {useState} from 'react'
import DamageModal from './DamageModal';

// REMEMBER. DAMAGE IS -ALL- SOURCES OF DAMAGE A SECOND. 

const Damage = ({id, damagesAtSec, onSubmit}) => {
  const damageList = new Set([]);


  for(const player in damagesAtSec) {
    if (damagesAtSec[player].length) {
      damagesAtSec[player].forEach(damageList.add, damageList)
    }
  }

  const listDamages = Array.from(damageList).map(damage => <li>{[damage.name,' ', '-', damage.amount, ' hp']}</li>);
  return (
    <React.Fragment>
      <span>Sec {id+1} &nbsp;</span>
      <DamageModal id={id} onSubmit={onSubmit}/>
      &nbsp;
      <ul>{listDamages}</ul>
    </React.Fragment>
  )
}

export default Damage;
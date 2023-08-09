import React, {Fragment} from 'react'
import Ability from './Ability';

//REMEMBER. ABILITIES IS -ALL- ABILITIES ACTIVE ON A PLAYER FOR EACH SECOND.

const Abilities = ({id, partyAttributes}) => {
  const players = Object.keys(partyAttributes)

  return (
    <Fragment>
      Second {id}
      <br/>
      {players.map((player) => (partyAttributes[player]['abilities'].map((ability) => (<Fragment><Ability key={player + '_' + ability} caster={player} name={ability}/><br/></Fragment>))))}
    </Fragment>
  )
}

export default Abilities;
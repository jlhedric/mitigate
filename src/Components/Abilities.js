import React, {Fragment} from 'react'
import Ability from './Ability';

//REMEMBER. ABILITIES IS -ALL- ABILITIES FOR EACH SECOND FOR EVERY PLAYER.
//activeAbilitiesPerSec IS ALL ACTIVE ABILITIES FOR EACH SECOND -ON- EACH PLAYER
//PARTY ATTRIBUTES IS THE LIST OF ABILITIES EACH PLAYER CAN CAST

const Abilities = ({id, partyAttributes, activeAbilitiesPerSec, onSubmit}) => {
  const players = Object.keys(partyAttributes)

  return (
    <Fragment>
      Second {id}
      <br/>
      {players.map((player) => (partyAttributes[player]['abilities'].map((ability) => (<Fragment><Ability key={player + '_' + ability} activeAbilitiesPerSec={activeAbilitiesPerSec} caster={player} name={ability} onSubmit={onSubmit}/><br/></Fragment>))))}
    </Fragment>
  )
}

export default Abilities;
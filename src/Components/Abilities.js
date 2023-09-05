import React, {Fragment} from 'react'
import Ability from './Ability';

//REMEMBER. ABILITIES IS -ALL- ABILITIES FOR THIS SECOND FOR EVERY PLAYER.
//STATUS IS THE COOLDOWN STATUS OF EACH ABILITY FOR EACH PLAYER FOR THIS SECOND


const Abilities = ({id, partyAttributes, abilitiesStatus, abilityToggle}) => {
  const players = Object.keys(partyAttributes)

  return (
    <Fragment>
      Second {id+1}
      <br/>
      {players.map((player) => (partyAttributes[player]['abilities'].map((ability) => (
      <Fragment>
        <Ability 
          key={player + '_' + ability}
          second={id+1}
          metaData={abilitiesStatus[player][ability]} 
          caster={player} 
          name={ability} 
          abilityToggle={abilityToggle}
        />
        <br/>
      </Fragment>))))}
    </Fragment>
  )
}

export default Abilities;
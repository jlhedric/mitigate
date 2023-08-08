import React, {Fragment} from 'react'
import Abilities from './Abilities'

const AbilitiesBucket = ({ fightDuration, partyAttributes }) => {
  const duration = Array(fightDuration).fill(1)

  return (
    <Fragment>
      {/* {players.map((player) => (
        partyAttributes[player]['abilities'].map((ability) => (
          <Abilities key={player + '_' + ability + '_' + (second+1)} caster={player} name={ability}/>))))} */}
      {duration.map((_, second) => (<Abilities key = {second+1} id={second+1} partyAttributes={partyAttributes}/>))}
    </Fragment>
  )
}

export default AbilitiesBucket;
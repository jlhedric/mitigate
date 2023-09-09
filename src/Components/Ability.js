import React, {Fragment} from 'react'
import { createPortal } from 'react-dom';
import AbilityModalContent from './AbilityModalContent';


const Ability = ({second, metaData, partyList, caster, name, targetType, abilityToggle}) => {
  const status = metaData['status']
  let initialVal = false;
  if(status === 'casted') {
    initialVal = true
  }
  const [checked, setChecked] = React.useState(initialVal);
  const [showModal, setShowModal] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
    abilityToggle(caster, name, metaData, second, !checked)
  };

  const handleModalChange = () => {
    setChecked(!checked);
    if(!checked) {
      setShowModal(true)
    }
  }

const AbilityCheckbox = () => {
  if(targetType === 'self') {   //TODO: check more than just targets
    return (
      <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
      />
    )
  }
  else {
    return(
      <input
        type="checkbox"
        checked={checked}
        onChange={handleModalChange}
      />
    )
  }
}

  return (
    <Fragment>
      <label> {caster}'s {name} </label>
      <AbilityCheckbox/>
      {showModal && createPortal(
        <AbilityModalContent 
          onClose={() => setShowModal(false)}
          partyList={partyList}
          caster={caster} 
          name={name}
          targetType={targetType}
          onSubmit={abilityToggle}
        />,
        document.body
      )}
      <label>{status} {metaData['stacks']['currStacks']}</label>
    &nbsp; 
  </Fragment>
  )
}

export default Ability;

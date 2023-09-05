import React, {Fragment} from 'react'


const Ability = ({second, metaData, caster, name, abilityToggle}) => {
  const status = metaData['status']
  let initialVal = false;
  if(status === 'casted') {
    initialVal = true
  }
  const [checked, setChecked] = React.useState(initialVal);

  const handleChange = () => {
    setChecked(!checked);
    abilityToggle(caster, name, second, !checked)
  };
  
  return (
    <Fragment>
      <label> {caster}'s {name} </label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label>{status}</label>
    &nbsp; 
  </Fragment>
  )
}

export default Ability;

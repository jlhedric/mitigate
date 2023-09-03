import React, {Fragment} from 'react'


const Ability = ({activeAbilitiesPerSec, caster, name, onSubmit}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  
  return (
    <Fragment>
      <label> {caster}'s {name} </label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
    &nbsp; 
  </Fragment>
  )
}

export default Ability;
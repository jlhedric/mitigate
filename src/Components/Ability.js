import React, {Fragment} from 'react'


const Ability = ({id, caster, name}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  
  return (
    <Fragment>
      <label> {caster}'s {name}
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
    </label>
    &nbsp; 
  </Fragment>
  )
}

export default Ability;
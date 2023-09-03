import React, {Fragment} from 'react'


const Ability = ({caster, name, onSubmit}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e) => {
    console.log(caster, name)
    setChecked(!checked);
  };
  
  return (
    <Fragment>
      <label> {caster}'s {name} </label>
      <form onSubmit={onSubmit}>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
        </form>
    &nbsp; 
  </Fragment>
  )
}

export default Ability;

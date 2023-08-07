import React from 'react'

//REMEMBER. ABILITIES IS -ALL- SOURCES OF MIT AND HEALING A SECOND.

const Abilities = ({id, name}) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <span>Ability {id} 
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
        />
    </label>
    &nbsp; 
  </span>
  )
}

export default Abilities;
import React from 'react'

//REMEMBER. ABILITIES IS -ALL- SOURCES OF MIT AND HEALING A SECOND.

export default function Abilities({id}) {
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
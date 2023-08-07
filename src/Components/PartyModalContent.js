import React from 'react'
import PartyModalMember from './PartyModalMember';


const PartyModalContent = ({ onClose, onSubmit, setShowModel }) => {
  const partySize = 8
  return (
      <div className='modal'>
        <form onSubmit={onSubmit}>
          Create an 8-man party (include food and party bonuses!)
          <br/>
          {Array(partySize).fill(1).map((_, index) => (<PartyModalMember key={index} id={index+1}/>))}
          <button type='submit'>Submit</button>
          <button onClick={onClose}>Close</button>
        </form>
        
      </div>
  );
}

export default PartyModalContent;
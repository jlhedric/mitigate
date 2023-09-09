import React, { useState} from 'react';
import { createPortal } from 'react-dom';
import AbilityModalContent from './AbilityModalContent';

const AbilityModal = ({id, onSubmit}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <button onClick={() => setShowModal(true)}>
        Select targets
      </button>
      {showModal && createPortal(
        <AbilityModalContent onClose={() => setShowModal(false)} id={id} onSubmit={onSubmit}/>,
        document.body
      )}
    </React.Fragment>
  );
}

export default AbilityModal;

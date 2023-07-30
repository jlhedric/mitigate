import React, { useState} from 'react';
import { createPortal } from 'react-dom';
import DamageModalContent from './DamageModalContent.js';

const DamageModal = ({id, onSubmit}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <button onClick={() => setShowModal(true)}>
        Add Damage
      </button>
      {showModal && createPortal(
        <DamageModalContent onClose={() => setShowModal(false)} id={id} onSubmit={onSubmit}/>,
        document.body
      )}
    </React.Fragment>
  );
}

export default DamageModal;

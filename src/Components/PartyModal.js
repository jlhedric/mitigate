import React, { useState} from 'react';
import { createPortal } from 'react-dom';
import PartyModalContent from './PartyModalContent';

const PartyModal = ({onSubmit}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <button onClick={() => setShowModal(true)}>
        Create Party
      </button>
      {showModal && createPortal(
        <PartyModalContent onClose={() => setShowModal(false)} onSubmit={onSubmit}/>,
        document.body
      )}
    </React.Fragment>
  );
}

export default PartyModal;

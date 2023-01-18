import React from 'react';
import { faker } from '@faker-js/faker';

const DiscoverModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <>
      <div className="overlayJoin">
        <div className="modalContainerJoin">
          <img src={faker.image.avatar()} />
          <div className="modalRight">
            <div className="contentJoin">
              <h1>hello</h1>
            </div>
            <div className="btnContainerJoin">
              <button className="Joinbtn">Yes</button>
              <button className="CancelJoinbtn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverModal;
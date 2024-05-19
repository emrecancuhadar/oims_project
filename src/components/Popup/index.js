import React from 'react';
import styles from './Popup.module.css'; // Ensure your CSS module is correctly referenced

function Popup({ content, isOpen, setIsOpen }) {
  if (!isOpen) return null;

  // Function to close the popup
  const closePopup = (event) => {
    event.stopPropagation(); // Prevent click from propagating to other elements
    setIsOpen(false); // Set the isOpen state to false, closing the popup
  };

  const handleBackdropClick = (event) => {
    closePopup(event); // Use closePopup to close the popup when clicking on the backdrop
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.popupContent} onClick={event => event.stopPropagation()}>
        {content}
        <button className={styles.popupButton} onClick={closePopup}>Close</button>
      </div>
    </div>
  );
}

export default Popup;

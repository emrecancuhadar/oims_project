import React, { useState } from 'react';
import styles from "./Popup.module.css";
 
function Popup({content, isOpen, setIsOpen}) {

  return (
    <div>
      {isOpen && (
       <div>
        <div className={styles.Popup}>
          {content}
        
        <button className = {styles.PopupButton} onClick={() => setIsOpen(false)}>
          Close
        </button>
        </div>
       </div>
      )}
    </div>
  );
}
 
export default Popup;
import React, { useState } from 'react';
import styles from "./Popup.module.css";
 
function Popup() {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <div>
      <button className = {styles.Popup} onClick={() => setIsOpen(true)}>
        Open Pop-up
      </button>
 
      {isOpen && (
       <div>
        <div className={styles.Popup}>
          This is the content of the pop-up.
        </div>
        <button className = {styles.Popup} onClick={() => setIsOpen(false)}>
          Close Pop-up
        </button>
       </div>
      )}
    </div>
  );
}
 
export default Popup;
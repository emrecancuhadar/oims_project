import React from "react";
import styles from "./Popup.module.css"; // Ensure your CSS module is correctly referenced

function Popup({ content, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.popupContent}
        onClick={(event) => event.stopPropagation()}
      >
        {content}
      </div>
    </div>
  );
}

export default Popup;

import React from 'react';
import styles from "./loading-screen.module.css";
    
function LoadingScreen() {
  return (
    <div className={styles.loadingScreen}>
      <div className="loader">Loading...</div>
    </div>
  );
}

export default LoadingScreen;
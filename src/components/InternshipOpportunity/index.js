import React from 'react';
import styles from './internship-opportunity.module.css';

function InternshipOpportunity({ opportunity }) {
  const handleActionClick = (event, action, id) => {
    event.stopPropagation();
    alert(`${action} clicked for internship ${id}`);
  };

  const handleContentClick = () => {
    alert("Content Clicked!");
  };

  return (
    <div className={styles.card} onClick={handleContentClick}>
      <div className={styles.content}>
        <h2>{opportunity.title}</h2>
        <h1>{opportunity.content}</h1>
        <button 
        onClick={(event) => handleActionClick(event, "Apply", opportunity.id)} 
        className={styles.applyBtn}
        >
        Apply
        </button>
     </div>
    </div>
  );
}

export default InternshipOpportunity;

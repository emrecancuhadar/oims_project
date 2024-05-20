import React from "react";
import styles from "./intern-card.module.css"

function InternCard( {student} ) {
    
    return (
        <div className={styles.card}>
      <div className={styles.cardBody}>
        <h2>{student.name}</h2>
        <div className={styles.studentInfoContainer}>
          <div className={styles.studentInfoRows}>
            <div className={styles.studentInfoRowDivs}>Phone Number:</div>
            {student.phoneNumber}
          </div>
          <div className={styles.studentInfoRows}>
            <div className={styles.studentInfoRowDivs}>Mail: </div>
            {student.mail}
          </div>
          <div className={styles.studentInfoRows}>
            <div className={styles.studentInfoRowDivs}>Status: </div>
            {student.status}
          </div>
        </div>
      </div>
      <div className={styles.cardButtons}>
        <div className={styles.buttons}>
          <button className={styles.uploadBtn}>Upload Application Form</button>
        </div>
        <div className={styles.buttons}>
          <button className={styles.downloadBtn}>
            Download Application Form
          </button>
        </div>
      </div>
    </div>
    )
}

export default InternCard;
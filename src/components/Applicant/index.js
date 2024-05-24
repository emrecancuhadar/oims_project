import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./applicant.module.css";

function Applicant({ applicant, onApprove, onDisapprove}) {


  const approveApplicant = () => {
    onApprove(applicant.id);
  };

  const disapproveApplicant = () => {
    onDisapprove(applicant.id);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
            <h2>{applicant.name}</h2>
            <p><strong>Mail:</strong> {applicant.mail}</p>
            <p><strong>Contact:</strong> {applicant.phoneNumber}</p>
        </div>
        <div className={styles.right}>
          <FontAwesomeIcon
            icon={faCheck}
            color="green"
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              approveApplicant();
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            color="red"
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              disapproveApplicant();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Applicant;

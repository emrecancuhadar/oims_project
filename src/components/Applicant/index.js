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

  const showApplicationLetter = () => {
    const documentBase64 = applicant.content;

    if (!documentBase64) {
      console.error("Document base64 data is missing");
      return;
    }

    const binaryString = window.atob(documentBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const pdfBlob = new Blob([bytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <div className={styles.card} onClick={showApplicationLetter}>
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

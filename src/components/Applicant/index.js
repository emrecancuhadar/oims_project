import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "./applicant.module.css";
import Popup from "../Popup";

function Applicant({ applicant, onApprove, onDisapprove}) {
  const [isApprovePopupOpen, setApprovePopupOpen] = useState(false);
  const [isDisapprovePopupOpen, setDisapprovePopupOpen] = useState(false);

  const approveApplicant = () => {
    onApprove(applicant.id);
    setApprovePopupOpen(true);
  };

  const disapproveApplicant = () => {
    onDisapprove(applicant.id);
    setDisapprovePopupOpen(true);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
            <h2>{applicant.name}</h2>
            <p><strong>Mail:</strong> {applicant.email}</p>
            <p><strong>Contact:</strong> {applicant.contact}</p>
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
      {isApprovePopupOpen && (
        <Popup
          content={"Applicant is approved"}
          isOpen={isApprovePopupOpen}
          setIsOpen={setApprovePopupOpen}
        />
      )}
      {isDisapprovePopupOpen && (
        <Popup
          content={"Applicant is disapproved"}
          isOpen={isDisapprovePopupOpen}
          setIsOpen={setDisapprovePopupOpen}
        />
      )}
    </>
  );
}

export default Applicant;

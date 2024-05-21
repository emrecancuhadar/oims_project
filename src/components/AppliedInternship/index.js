import React, { useState } from "react";
import Popup from "../Popup";
import styles from "./applied-internship.module.css";

function AppliedInternship({ internship }) {
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const handleContentClick = (event) => {
    alert("Content Clicked!");
  };

  const handleRegisterInitiate = (event) => {
    event.stopPropagation();
    setRegisterPopupOpen(true);
  };

  const handleRegisterConfirm = (event) => {
    event.stopPropagation();
    console.log("Registering to:", internship.companyName);
    setRegisterPopupOpen(false);
    setConfirmationPopupOpen(true);
  };

  const handleCancelRegistration = (event) => {
    event.stopPropagation();
    setRegisterPopupOpen(false);
  };

  const handleConfirmationClose = (event) => {
    event.stopPropagation();
    setConfirmationPopupOpen(false);
  };

  const RegistrationConfirmationContent = () => (
    <div
      className={styles.popupContent}
      onClick={(event) => event.stopPropagation()}
    >
      <h1>Are you sure you want to register to {internship.companyName}?</h1>
      <div className={styles.btns}>
        <button
          className={styles.popupCancelBtn}
          onClick={handleCancelRegistration}
        >
          Cancel
        </button>
        <button
          className={styles.popupApplyBtn}
          onClick={handleRegisterConfirm}
        >
          Register
        </button>
      </div>
    </div>
  );

  const RegistrationCompleteContent = () => (
    <div
      className={styles.popupContent}
      onClick={(event) => event.stopPropagation()}
    >
      <h1>Registered to {internship.companyName}</h1>
      <button className={styles.popupCnfBtn} onClick={handleConfirmationClose}>
        Done
      </button>
    </div>
  );

  return (
    <div className={styles.card} onClick={handleContentClick}>
      <div className={styles.content}>
        <h2>{internship.companyName}</h2>
        <div>
          <p>
            <strong>Position:</strong> {internship.position}
          </p>
          <p>
            <strong>E-mail: </strong>
            {internship.companyEmail}
          </p>
          <p>
            <strong>Application Date: </strong>
            {internship.applicationDate}
          </p>
        </div>

        {internship.status === "ACCEPTED" && (
          <button
            onClick={handleRegisterInitiate}
            className={styles.registerBtn}
          >
            Register
          </button>
        )}
        {registerPopupOpen && (
          <Popup
            content={<RegistrationConfirmationContent />}
            isOpen={registerPopupOpen}
            setIsOpen={setRegisterPopupOpen}
          />
        )}
        {confirmationPopupOpen && (
          <Popup
            content={<RegistrationCompleteContent />}
            isOpen={confirmationPopupOpen}
            setIsOpen={setConfirmationPopupOpen}
          />
        )}
      </div>
    </div>
  );
}

export default AppliedInternship;

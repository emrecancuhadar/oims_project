import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import Popup from "../Popup";
import styles from "./applied-internship.module.css";

function AppliedInternship({ internship, handleRegisterInitiate, registerPopupOpen, setRegisterPopupOpen, confirmationPopupOpen, setConfirmationPopupOpen, fetchAppliedInternships }) {
  const { user } = useContext(UserContext);

  const handleRegisterConfirm = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append("studentId", user.id);
    formData.append("announcementId", internship.id);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/internship-registration/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Registering to:", internship.companyName);
        fetchAppliedInternships();
        setRegisterPopupOpen(false);
        setConfirmationPopupOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
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
    <div className={styles.card} onClick={() => {}}>
      <div className={styles.content}>
        <h2>{internship.companyName}</h2>
        <div>
          <p><strong>Position:</strong> {internship.position}</p>
          <p><strong>E-mail:</strong> {internship.companyEmail}</p>
          <p><strong>Application Date:</strong> {internship.applicationDate}</p>
        </div>

        {internship.status === "ACCEPTED" &&
          (internship.registrationStatus === "ACCEPTED" ? (
            <p className={styles.acceptedApplicationStatus}>Registered</p>
          ) : internship.registrationStatus === "REJECTED" ? (
            <p className={styles.acceptedApplicationStatus}>Rejected</p>
          ) : (
            <button
              onClick={handleRegisterInitiate}
              className={styles.registerBtn}
            >
              Register
            </button>
          ))}
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

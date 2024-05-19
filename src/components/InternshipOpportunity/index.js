import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import Popup from "../Popup";
import styles from "./internship-opportunity.module.css";

function InternshipOpportunity({ opportunity }) {
  const { user } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const showAnnouncement = () => {
    const documentBase64 = opportunity.content;

    if (!documentBase64) {
      console.error("Document base64 data is missing");
      return;
    }

    // Decode the Base64 string to binary
    const binaryString = window.atob(documentBase64);
    const len = binaryString.length;
    console.log(binaryString);
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    console.log(bytes);

    // Create a Blob from the binary data
    const pdfBlob = new Blob([bytes], { type: "application/pdf" });

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new browser tab
    window.open(pdfUrl, "_blank");
  };

  const handleApplyLogic = (event) => {
    event.stopPropagation();
    setPopupOpen(true);
  };

  const handleApply = (event) => {
    event.stopPropagation();
    console.log("Applying to:", opportunity.companyName);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/students/${user.id}/apply/${opportunity.id}`
      )
      .then((response) => {
        setPopupOpen(false);
        setConfirmationPopupOpen(true);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = (event) => {
    event.stopPropagation();
    setPopupOpen(false);
  };

  const handleConfirmationClose = () => {
    setConfirmationPopupOpen(false);
  };

  const PopupContent = () => (
    <div
      className={styles.popupContent}
      onClick={(event) => event.stopPropagation()}
    >
      <h1>Are you sure you want to apply to {opportunity.companyName}?</h1>
      <div className={styles.btns}>
        <button className={styles.popupCancelBtn} onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.popupApplyBtn} onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );

  const ConfirmationContent = () => (
    <div
      className={styles.popupContent}
      onClick={(event) => event.stopPropagation()}
    >
      <h1>Applied to {opportunity.companyName}</h1>
      <button className={styles.popupCnfBtn} onClick={handleConfirmationClose}>
        Done
      </button>
    </div>
  );

  return (
    <div className={styles.card} onClick={showAnnouncement}>
      <div className={styles.content}>
        <h2>{opportunity.companyName}</h2>
        <h1>Position: {opportunity.title}</h1>
        <p>E-mail: {opportunity.email}</p>
        <p>Deadline: {opportunity.deadline}</p>
        <button onClick={handleApplyLogic} className={styles.applyBtn}>
          Apply
        </button>
      </div>
      {popupOpen && (
        <Popup
          content={<PopupContent />}
          isOpen={popupOpen}
          setIsOpen={setPopupOpen}
        />
      )}
      {confirmationPopupOpen && (
        <Popup
          content={<ConfirmationContent />}
          isOpen={confirmationPopupOpen}
          setIsOpen={setConfirmationPopupOpen}
        />
      )}
    </div>
  );
}

export default InternshipOpportunity;

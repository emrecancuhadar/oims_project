  import axios from "axios";
  import React, { useContext, useState } from "react";
  import { UserContext } from "../../context/UserProvider";
  import Popup from "../Popup";
  import styles from "./internship-opportunity.module.css";

  function InternshipOpportunity({ announcement, onApply }) {
    const [popupOpen, setPopupOpen] = useState(false);
    const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
    

    const showAnnouncement = () => {
      const documentBase64 = announcement.content;

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

      // Create a Blob from the binary data
      const pdfBlob = new Blob([bytes], { type: "application/pdf" });

      // Generate a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new browser tab
      window.open(pdfUrl, "_blank");
    };

    const applyAnnouncement = () => {
      onApply(announcement.id);
    };
  
    const PopupContent = () => (
      <div
        className={styles.popupContent}
        onClick={(event) => event.stopPropagation()}
      >
        <h1>Are you sure you want to apply to {announcement.companyName}?</h1>
        <div className={styles.btns}>
          <button 
          className={styles.popupCancelBtn}
           onClick={(event) => {
          event.stopPropagation();
          setPopupOpen(false);
        }}>
            Cancel
          </button>
          <button 
          className={styles.popupApplyBtn} 
          onClick={(event) => {
            event.stopPropagation();
            setPopupOpen(false);
            setConfirmationPopupOpen(true);
            applyAnnouncement();
          }}>
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
        <h1>Applied to {announcement.companyName}</h1>
        <button 
        className={styles.popupCnfBtn} 
        onClick={(event) => {
          event.stopPropagation();
          setConfirmationPopupOpen(false);
        }}>
          Done
        </button>
      </div>
    );

    return (
      <div className={styles.card} onClick={showAnnouncement}>
        <div className={styles.content}>
          <h2>{announcement.companyName}</h2>
          <div>
            <p>
              <strong>Position:</strong> {announcement.title}
            </p>
            <p>
              <strong>Mail:</strong> {announcement.email}
            </p>
            <p>
              <strong>Deadline:</strong> {announcement.deadline}
            </p>
          </div>
          <button 
          className={styles.applyBtn} 
          onClick={(event) => {
          event.stopPropagation();
          setPopupOpen(true);
          }}>

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

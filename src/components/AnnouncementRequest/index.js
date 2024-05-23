import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./announcement-request.module.css";

function AnnouncementRequest({ announcementRequest, onApprove, onDisapprove, onBan }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const showAnnouncementRequest = () => {
    const documentBase64 = announcementRequest.content;

    if (!documentBase64) {
      console.error("Document base64 data is missing");
      return;
    }

    // Decode the Base64 string to binary
    const binaryString = window.atob(documentBase64);
    const len = binaryString.length;
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

  const approveAnnouncementRequest = () => {
    onApprove(announcementRequest.id);
  };

  const disapproveAnnouncementRequest = () => {
    onDisapprove(announcementRequest.id);
  };

  const banCompanyRequest = () => {
    onBan(announcementRequest.companyId);
  };

  const giveFeedback = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.card} onClick={() => showAnnouncementRequest()}>
        <div className={styles.left}>
          <div className={styles.announcentmentUpperDiv}>
            <h2>{announcementRequest.title}</h2>
            <div className={styles.altTextInfo}>
              <strong>Deadline:</strong>
              <p>{announcementRequest.deadline}</p>
            </div>
            <div className={styles.altTextInfo}>
              <strong>CompanyName:</strong>
              <p>{announcementRequest.companyName}</p>
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.feedbackBtn}
              onClick={(event) => {
                event.stopPropagation();
                giveFeedback();
              }}
            >
              Feedback
            </button>
            <button
              className={styles.banBtn}
              onClick={(event) => {
                event.stopPropagation();
                banCompanyRequest();
              }}
            >
              Ban
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <FontAwesomeIcon
            icon={faCheck}
            color="green"
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              approveAnnouncementRequest();
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            color="red"
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              disapproveAnnouncementRequest();
            }}
          />
        </div>
      </div>
      <FeedbackModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        receiver={{ id: announcementRequest.id, name: "announcement" }}
      />
    </>
  );
}

export default AnnouncementRequest;

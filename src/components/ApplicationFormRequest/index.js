import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./application-form-request.module.css";

function ApplicationFormRequest({
  applicationFormRequest,
  onApprove,
  onDisapprove,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const giveFeedback = () => {
    setModalOpen(true);
  };

  const showApplicationFormRequest = () => {
    console.log("clicked");
    const documentBase64 = applicationFormRequest.content;

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
    const pdfBlob = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new browser tab
    window.open(pdfUrl, "_blank");
  };

  const approveApplicationFormRequest = () => {
    onApprove(applicationFormRequest.id);
  };

  const disapproveApplicationFormRequest = () => {
    onDisapprove(applicationFormRequest.id);
  };

  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.card}
        onClick={(event) => {
          event.stopPropagation();
          showApplicationFormRequest();
          /* download form kısmı eklenecek */
        }}
      >
        <div className={styles.left}>
          <div>
            <h2 className={styles.formOwnerTitle}>
              {applicationFormRequest.owner}
            </h2>
            <p>{applicationFormRequest.email}</p>
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
              approveApplicationFormRequest();
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            color="red"
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              disapproveApplicationFormRequest();
            }}
          />
        </div>
      </div>
      <FeedbackModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        receiver={{ id: ApplicationFormRequest.id, name: "company" }}
      />
    </div>
  );
}

export default ApplicationFormRequest;

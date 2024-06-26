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
  const [eligibility, setEligibility] = useState(0);

  const giveFeedback = () => {
    setModalOpen(true);
  };

  const showApplicationFormRequest = () => {
    console.log(applicationFormRequest, "request");
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
    const blob = new Blob([bytes], {
      type: applicationFormRequest.contentType,
    });

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(blob);

    // Open the PDF in a new browser tab
    window.open(pdfUrl, "_blank");
  };

  const approveApplicationFormRequest = () => {
    onApprove(
      applicationFormRequest.id,
      applicationFormRequest.email,
      eligibility
    );
  };

  const disapproveApplicationFormRequest = () => {
    onDisapprove(applicationFormRequest.id);
  };

  const changeEligibility = (event) => {
    event.stopPropagation();
    setEligibility(eligibility === 0 ? 1 : 0);
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
          <button
            style={
              eligibility === 1
                ? { borderColor: "green", color: "green" }
                : { borderColor: "red", color: "red" }
            }
            className={styles.eligibilityBtn}
            onClick={changeEligibility}
          >
            {eligibility === 1 ? "Eligible" : "Not Eligible"}
          </button>
          <div className={styles.rightBtnContainer}>
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
      </div>
      <FeedbackModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        receiver={{ id: applicationFormRequest.companyId, name: "company" }}
      />
    </div>
  );
}

export default ApplicationFormRequest;

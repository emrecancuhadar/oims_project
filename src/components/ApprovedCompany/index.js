import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./approved-company.module.css";

function ApprovedCompany({
  approvedCompany,
  onBan,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const banApprovedCompany = () => {
    onBan(approvedCompany.companyId, approvedCompany.id);
  };

  const giveFeedback = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.companyUpperDiv}>
            <h2>{approvedCompany.companyName}</h2>
            <div className={styles.altTextInfo}>
              <strong>Email:</strong>
              <p>{approvedCompany.email}</p>
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
                banApprovedCompany();
              }}
            >
              Ban
            </button>
          </div>
        </div>
        <div>
        <FeedbackModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        receiver={{ id: approvedCompany.companyId, name: "company" }}
      />
        </div>
      </div>

    </>
  );
}

export default ApprovedCompany;

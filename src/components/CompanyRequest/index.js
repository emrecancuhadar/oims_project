import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./company-request.module.css";

function CompanyRequest({ companyRequest, onApprove, onDisapprove, onBan }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const approveCompanyRequest = () => {
    onApprove(companyRequest.id);
  };

  const disapproveCompanyRequest = () => {
    onDisapprove(companyRequest.id);
  };

  const banCompanyRequest = () => {
    onBan(companyRequest.id);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.left}>
          <div>
            <h2>{companyRequest.companyName}</h2>
            <p>{companyRequest.email}</p>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.feedbackBtn}
              onClick={() => setModalOpen(true)}
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
              approveCompanyRequest();
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            color="red"
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              disapproveCompanyRequest();
            }}
          />
        </div>
      </div>
      <FeedbackModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        receiver={{ id: companyRequest.id, name: "company" }}
      />
    </>
  );
}

export default CompanyRequest;

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./company-request.module.css";
import Popup from "../Popup";

function CompanyRequest({ companyRequest, onApprove, onDisapprove, onBan }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isApprovePopupOpen, setApprovePopupOpen] = useState(false);
  const [isDisapprovePopupOpen, setDisapprovePopupOpen] = useState(false);
  const [isBanPopupOpen, setBanPopupOpen] = useState(false);

  const approveCompanyRequest = () => {
    onApprove(companyRequest.id);
    setApprovePopupOpen(true);
  };

  const disapproveCompanyRequest = () => {
    onDisapprove(companyRequest.id);
    setDisapprovePopupOpen(true);
  };

  const banCompanyRequest = () => {
    setBanPopupOpen(true);
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

      {isApprovePopupOpen && (
        <Popup
          content={"Company is approved"}
          isOpen={isApprovePopupOpen}
          setIsOpen={setApprovePopupOpen}
        />
      )}
      {isDisapprovePopupOpen && (
        <Popup
          content={"Company is disapproved"}
          isOpen={isDisapprovePopupOpen}
          setIsOpen={setDisapprovePopupOpen}
        />
      )}
      {isBanPopupOpen && (
        <Popup
          content={"Company is banned"}
          isOpen={isBanPopupOpen}
          setIsOpen={setBanPopupOpen}
        />
      )}
    </>
  );
}

export default CompanyRequest;

import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import styles from "./application-form-request.module.css";
import Popup from "../Popup";
import FeedbackModal from "../FeedbackModal";

function ApplicationFormRequest({ applicationFormRequest }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isApprovePopupOpen, setApprovePopupOpen] = useState(false);
  const [isDisapprovePopupOpen, setDisapprovePopupOpen] = useState(false);

  const approveApplicationFormRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/spc/application-forms/${applicationFormRequest.id}/approve`
      )
      .then((response) => {
        console.log(response);
        setApprovePopupOpen(true);
      })
      .catch((error) => console.log(error));
  };
  const disapproveApplicationFormRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/spc/application-forms/${applicationFormRequest.id}/disapprove`
      )
      .then((response) => {
        setDisapprovePopupOpen(true);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const giveFeedback = () => {
    setModalOpen(true);
  };
  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.card}
        onClick={(event) => {
          event.stopPropagation();
          /* download form kısmı eklenecek */
        }}
      >
        <div className={styles.left}>
          <div>
            <h2 className={styles.formOwnerTitle}>{applicationFormRequest.owner}</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.feedbackBtn} onClick={(event) => {
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
        receiver={{ id: ApplicationFormRequest.id, name: "application" }}
      />
      {isApprovePopupOpen && (
        <Popup
          content={"Application form is approved"}
          isOpen={isApprovePopupOpen}
          setIsOpen={setApprovePopupOpen}
        />
      )}
      {isDisapprovePopupOpen && (
        <Popup
          content={"Application form is disapproved"}
          isOpen={isDisapprovePopupOpen}
          setIsOpen={setDisapprovePopupOpen}
        />
      )}
    </div>
  );
}

export default ApplicationFormRequest;

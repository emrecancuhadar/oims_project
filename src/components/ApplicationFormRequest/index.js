import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState }  from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./application-form-request.module.css";
import Popup from "../Popup";

function ApplicationFormRequest({ applicationFormRequest }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const approveApplicationFormRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/spc/document/${applicationFormRequest.id}/approve`
      )
      .then((response) => {
        console.log(response);
        alert("Application Form is approved");
      })
      .catch((error) => console.log(error));
  };
  const disapproveApplicationFormRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/spc/document/${applicationFormRequest.id}/disapprove`
      )
      .then((response) => {
        alert("Application Form is disapproved");
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
            <h2 className={styles.formOwnerTitle}>[student.name]</h2>
          </div>
          <div className={styles.buttons}>
            <button className={styles.feedbackBtn} onClick={giveFeedback}>
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
    </div>
  );
}

export default ApplicationFormRequest;

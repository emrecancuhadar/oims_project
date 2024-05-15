import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import styles from "./application-form-request.module.css";



function ApplicationFormRequest({ applicationFormRequest }) {
    
  const approveApplicationFormRequest = () => {
    axios
      .put(
        `http://localhost:8081/spc/application-forms/${applicationFormRequest.id}/approve`
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
        `http://localhost:8081/spc/application-forms/${applicationFormRequest.id}/disapprove`
      )
      .then((response) => {
        alert("Application Form is disapproved");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const giveFeedback = () => {};
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div>
          <h2 className={styles.formOwnerTitle}>Student Name Example</h2>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.showApplicationFormBtn}
            onClick={(event) => {
              event.stopPropagation();
              /* download form kısmı eklenecek */
            }}
          >
            Show Form
          </button>
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
  );
}

export default ApplicationFormRequest;

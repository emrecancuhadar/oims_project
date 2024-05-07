import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import styles from "./company-request.module.css";

function CompanyRequest({ companyRequest }) {
  const approveCompanyRequest = () => {
    axios
      .put(
        `http://localhost:8081/systemadmin/company/${companyRequest.id}/approve`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const disapproveCompanyRequest = () => {
    axios
      .put(
        `http://localhost:8081/systemadmin/company/${companyRequest.id}/disapprove`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const banCompany = () => {
    axios
      .put(`http://localhost:8081/systemadmin/company/${companyRequest.id}/ban`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const giveFeedback = () => {};

  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div>
          <h2>{companyRequest.companyName}</h2>
        </div>
        <div className={styles.buttons}>
          <button className={styles.feedbackBtn} onClick={giveFeedback}>
            Feedback
          </button>
          <button
            className={styles.banBtn}
            onClick={(event) => {
              event.stopPropagation();
              banCompany();
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
  );
}

export default CompanyRequest;

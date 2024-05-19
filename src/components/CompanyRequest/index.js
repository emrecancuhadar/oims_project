import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./company-request.module.css";

function CompanyRequest({ companyRequest }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const approveCompanyRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyRequest.id}/approve`
      )
      .then((response) => {
        console.log(response);
        alert("Company is approved");
      })
      .catch((error) => console.log(error));
  };
  const disapproveCompanyRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyRequest.id}/disapprove`
      )
      .then((response) => {
        alert("Company is disapproved");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const banCompany = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyRequest.id}/ban`
      )
      .then((response) => {
        alert("Company is banned");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const giveFeedback = () => {};

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
      <FeedbackModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        receiver={{ id: companyRequest.id, name: "company" }}
      />
    </>
  );
}

export default CompanyRequest;

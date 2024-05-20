import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./company-request.module.css";
import Popup from "../Popup";

function CompanyRequest({ companyRequest }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isApprovePopupOpen, setApprovePopupOpen] = useState(false);
  const [isDisapprovePopupOpen, setDisapprovePopupOpen] = useState(false);
  const [isBanPopupOpen, setBanPopupOpen] = useState(false);

  const approveCompanyRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyRequest.id}/approve`
      )
      .then((response) => {
        console.log(response);
        setApprovePopupOpen(true);
      })
      .catch((error) => console.log(error));
  };

  const disapproveCompanyRequest = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyRequest.id}/disapprove`
      )
      .then((response) => {
        console.log(response);
        setDisapprovePopupOpen(true);
      })
      .catch((error) => console.log(error));
  };

  const banCompany = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyRequest.id}/ban`
      )
      .then((response) => {
        console.log(response);
        setBanPopupOpen(true);
      })
      .catch((error) => console.log(error));
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

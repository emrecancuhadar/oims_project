import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import FeedbackModal from "../FeedbackModal";
import styles from "./announcement-request.module.css";

function AnnouncementRequest({ announcementRequest }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const showAnnouncementRequest = () => {
    const documentBase64 = announcementRequest.content;

    if (!documentBase64) {
      console.error("Document base64 data is missing");
      return;
    }

    // Decode the Base64 string to binary
    const binaryString = window.atob(documentBase64);
    const len = binaryString.length;
    console.log(binaryString);
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    console.log(bytes);

    // Create a Blob from the binary data
    const pdfBlob = new Blob([bytes], { type: "application/pdf" });

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new browser tab
    window.open(pdfUrl, "_blank");
  };

  const approveAnnouncementRequest = () => {
    axios
      .put(
        `http://localhost:8081/systemadmin/document/${announcementRequest.id}/approve`
      )
      .then((response) => {
        alert("Announcement is approved");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const disapproveAnnouncementRequest = () => {
    axios
      .put(
        `http://localhost:8081/systemadmin/document/${announcementRequest.id}/disapprove`
      )
      .then((response) => {
        alert("Announcement is disapproved");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  const banCompany = () => {
    axios
      .put(
        `http://localhost:8081/systemadmin/company/${announcementRequest.companyId}/ban`
      )
      .then((response) => {
        alert("Company is banned");
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const giveFeedback = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.card} onClick={() => showAnnouncementRequest()}>
        <div className={styles.left}>
          <div>
            <h2>{announcementRequest.title}</h2>
            <p>{announcementRequest.deadline}</p>
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
              approveAnnouncementRequest();
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            color="red"
            size="2x"
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              event.stopPropagation(); // Stop event propagation
              disapproveAnnouncementRequest();
            }}
          />
        </div>
      </div>
      <FeedbackModal
        isModalOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        receiver={{ id: announcementRequest.id, name: "announcement" }}
      />
    </>
  );
}

export default AnnouncementRequest;

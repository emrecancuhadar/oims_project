import axios from "axios";
import React, { useState } from "react";
import styles from "./feedback-modal.module.css";

function FeedbackModal({ isModalOpen, closeModal, receiver }) {
  const [feedback, setFeedback] = useState("");

  if (!isModalOpen) return null;

  const saveFeedback = () => {
    const url = `${process.env.REACT_APP_API_URL}/feedback/${receiver.name}/${receiver.id}`;

    axios
      .post(url, {
        content: feedback,
      })
      .then((response) => {
        alert("Feedback sent");
        console.log(response);
        closeModal();
      })
      .catch((error) => {
        alert("Failed to send feedback");
        console.log(error);
      });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={closeModal}>
          &times;
        </button>
        <div className={styles.content}>
          <h1 style={{ color: "black" }}>Feedback</h1>
          <textarea
            rows={5}
            cols={40}
            className={styles.feedbackText}
            placeholder="Enter your feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button className={styles.sendBtn} onClick={saveFeedback}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackModal;

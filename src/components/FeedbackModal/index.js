import axios from "axios";
import React, { useState } from "react";
import styles from "./feedback-modal.module.css";
import Popup from "../Popup";

function FeedbackModal({ isModalOpen, closeModal, receiver }) {
  const [feedback, setFeedback] = useState("");
  const [isFeedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
  const [isFeedbackFailedPopupOpen, setFeedbackFailedPopupOpen] = useState(false);

  if (!isModalOpen) return null;

  const saveFeedback = () => {
    const url = `${process.env.REACT_APP_API_URL}/feedback/${receiver.name}/${receiver.id}`;

    axios
      .post(url, {
        content: feedback,
      })
      .then((response) => {
        setFeedbackPopupOpen(true);
        console.log(response);
      })
      .catch((error) => {
        setFeedbackFailedPopupOpen(true);
        console.log(error);
      });
  };

  const handleOverlayClick = (event) => {
    event.stopPropagation();
    closeModal();
  };


  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
      {isFeedbackPopupOpen && (
        <Popup
          content={ 'Feedback is sent' }
          isOpen={isFeedbackPopupOpen}
          setIsOpen={setFeedbackPopupOpen}
        />
      )}
      {isFeedbackFailedPopupOpen && (
        <Popup
          content={ 'Failed to send feedback' }
          isOpen={isFeedbackFailedPopupOpen}
          setIsOpen={setFeedbackFailedPopupOpen}
        />
      )}
    </div>
  );
}

export default FeedbackModal;

import React, { useState } from 'react';
import styles from './internship-opportunity.module.css';
import Modal from "@mui/material/Modal";
import Popup from '../Popup';

function InternshipOpportunity({ opportunity }) {
  const [open, setOpen] = useState(false);  // Controls the modal
  const [email, setEmail] = useState("");  // State to store the email
  const [popupOpen, setPopupOpen] = useState(false);  // State to control the popup

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleContentClick = () => {
    alert("Content Clicked!");
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const sendEmail = (event) => {
    event.stopPropagation();
    setPopupOpen(true);  // Open the popup on sending email
  }

  return (
    <div>
      {open && <div className={styles.backdrop}></div>}
      <div className={styles.card} onClick={handleContentClick}>
        <div className={styles.content}>
          <h2>{opportunity.title}</h2>
          <h1>{opportunity.content}</h1>
          <button 
            onClick={handleOpen} 
            className={styles.applyBtn}
          >
          Apply
          </button>
        </div>
        <Modal open={open} onClose={handleClose} onClick={handleModalClick}>
          <div className={styles.modal}>
            <h1>Enter the e-mail of the company</h1>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={styles.emailInput}
              value={email}
              onChange={handleEmailChange}
              onClick={(event) => event.stopPropagation()}
              required
            />
            <button 
              onClick={sendEmail} 
              className={styles.sendButton}
            >
              Send E-Mail
            </button>
            {popupOpen && <Popup content={"Application letter is sent"} isOpen={popupOpen} setIsOpen={setPopupOpen}/>}
          </div>
        </Modal>
      </div>
      
    </div>
  );
}

export default InternshipOpportunity;

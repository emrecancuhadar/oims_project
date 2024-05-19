import React, { useState } from 'react';
import styles from './internship-opportunity.module.css';
import Popup from '../Popup';

function InternshipOpportunity({ opportunity }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  const handleContentClick = () => {
    alert("Content Clicked!");
  };

  const handleApplyLogic = (event) => {
    event.stopPropagation();
    setPopupOpen(true);
  };

  const handleApply = (event) => {
    event.stopPropagation();
    console.log("Applying to:", opportunity.companyName);
    setPopupOpen(false);
    setConfirmationPopupOpen(true);
  };

  const handleCancel = (event) => {
    event.stopPropagation();
    setPopupOpen(false);
  };

  const handleConfirmationClose = () => {
    setConfirmationPopupOpen(false);
  };

  const PopupContent = () => (
    <div className={styles.popupContent} onClick={event => event.stopPropagation()}>
      <h1>Are you sure you want to apply to {opportunity.companyName}?</h1>
      <div className={styles.btns}>
        <button className={styles.popupCancelBtn} onClick={handleCancel}>Cancel</button>
        <button className={styles.popupApplyBtn} onClick={handleApply}>Apply</button>
      </div>
    </div>
  );

  const ConfirmationContent = () => (
    <div className={styles.popupContent} onClick={event => event.stopPropagation()}>
      <h1>Applied to {opportunity.companyName}</h1>
      <button className={styles.popupCnfBtn} onClick={handleConfirmationClose}>Done</button>
    </div>
  );

  return (
    <div>
      {open && <div className={styles.backdrop}></div>}
      <div className={styles.card} onClick={handleContentClick}>
        <div className={styles.content}>
          <h2>{opportunity.companyName}</h2>
          <div className={styles.altText}>
            <div className={styles.altTextEntry}>
              <p>Title: </p>
              {opportunity.content}
            </div>
            <div className={styles.altTextEntry}>
              <p>Mail: </p>
              {opportunity.email}
            </div>
            
          </div>
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
              placeholder="Enter company email" 
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
      
    <div className={styles.card} onClick={handleContentClick}>
      <div className={styles.content}>
        <h2>{opportunity.companyName}</h2>
        <h1>Position: {opportunity.content}</h1>
        <p>E-mail: {opportunity.email}</p>
        <button 
          onClick={handleApplyLogic}
          className={styles.applyBtn}
        >
        Apply
        </button>
      </div>
      {popupOpen && <Popup content={<PopupContent />} isOpen={popupOpen} setIsOpen={setPopupOpen} />}
      {confirmationPopupOpen && <Popup content={<ConfirmationContent />} isOpen={confirmationPopupOpen} setIsOpen={setConfirmationPopupOpen} />}
    </div>
  );
}

export default InternshipOpportunity;

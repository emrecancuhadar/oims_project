import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useRef, useState } from "react";
import styles from "../CompanyAnnouncement/company-announcement.module.css";
import Popup from "../Popup";

function FileUploader({ initialFileName, setFile }) {
  const hiddenFileInput = useRef(null);
  const [fileName, setFileName] = useState(initialFileName);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      setFileName(fileUploaded.name);
      setFile(fileUploaded);
    }
  };

  return (
    <>
      <div className={styles.uploadBtnDiv}>
        <button className={styles.uploadBtn} onClick={handleClick}>
          Upload Announcement
        </button>
        <input
          type="file"
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
        <span>{fileName}</span>
      </div>
    </>
  );
}

function CompanyAnnouncement({ announcement, onDelete }) {
  const [open, setOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [title, setTitle] = useState(announcement.title);
  const [deadline, setDeadline] = useState(announcement.deadline);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleOpen = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setOpen(false);
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("id", announcement.id);
    formData.append("title", title);
    formData.append("deadline", deadline);
    formData.append("file", file);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/announcements/update/${announcement.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setEditPopupOpen(true);
        setOpen(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
        }
        console.error("Error uploading the announcement:", error);
      });
  };

  const handleDelete = () => {
    onDelete(announcement.id)
    setPopupOpen(false);
  };

  const showDeletePopup = (event) => {
    event.stopPropagation();
    setPopupOpen(true);
  }

  const showAnnouncement = () => {
    const documentBase64 = announcement.content;

    if (!documentBase64) {
      console.error("Document base64 data is missing");
      return;
    }

    const binaryString = window.atob(documentBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const pdfBlob = new Blob([bytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  const DeleteConfirmationContent = () => (
    <div
      className={styles.popupContent}
      onClick={(event) => event.stopPropagation()}
    >
      <h1>Are you sure you want to delete this announcement?</h1>
      <div className={styles.btns}>
        <button
          className={styles.popupCancelBtn}
          onClick={() => setPopupOpen(false)}
        >
          Cancel
        </button>
        <button 
          className={styles.popupDeleteBtn} 
          onClick={(event) => {
            event.stopPropagation();
            handleDelete();
        }}>
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.card} onClick={showAnnouncement}>
      <div className={styles.announcentmentUpperDiv}>
        <div>
          <h2>{announcement.title}</h2>
        </div>
        <div className={styles.announcementAltText}>
          <div className={styles.announcementAltTextInfo}>
            <strong>Deadline:</strong>
            <p>{announcement.deadline}</p>
          </div>
          <div className={styles.announcementAltTextInfo}>
            <strong>Status:</strong>
            <p>{announcement.status}</p>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.feedbackBtn} onClick={handleOpen}>
          Edit
        </button>
        <button className={styles.banBtn} onClick={showDeletePopup}>
          Delete
        </button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h1>Edit Announcement</h1>
          <div className={styles.inputGroup}>
            <span className={styles.inputGroupText}>Title</span>
            <input
              type="text"
              className={styles.formControl}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.deadline} htmlFor="deadline">
              Deadline:
            </label>
            <input
              type="date"
              className={styles.formControl}
              name="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <FileUploader
              initialFileName={announcement.fileName}
              setFile={setFile}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button
            className={styles.sendBtn}
            type="button"
            onClick={handleUpdate}
            disabled={!title || !deadline}
          >
            Update Announcement
          </button>
        </div>
      </Modal>

      {popupOpen && (
        <Popup
          content={<DeleteConfirmationContent />}
          isOpen={popupOpen}
          setIsOpen={setPopupOpen}
        />
      )}
      {editPopupOpen && (
        <Popup
          content={"Announcement is updated"}
          isOpen={editPopupOpen}
          setIsOpen={setEditPopupOpen}
        />
      )}
    </div>
  );
}

export default CompanyAnnouncement;

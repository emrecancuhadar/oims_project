import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import Popup from "../Popup";
import styles from "./eligible-student.module.css";

function FileUploader({ studentId, studentEmail, setPopupOpen, setError }) {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = (fileUploaded) => {
    const formData = new FormData();
    formData.append("studentEmail", studentEmail);
    formData.append("file", fileUploaded);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/department-secretary/upload-ssi-certificate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPopupOpen(true);
        setError(""); // Clear any existing error when upload is successful
        axios.post(
          `${process.env.REACT_APP_API_URL}/feedback/iztech-user/${studentId}`,
          {
            content: "SSI certificate is uploaded.",
          }
        );
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setError(error.response.data);
        }
        console.error("Error uploading the announcement:", error);
      });
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    uploadFile(fileUploaded);
  };

  return (
    <>
      <button className={styles.uploadBtn} onClick={handleClick}>
        Upload SSI Certificate
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{ display: "none" }}
      />
    </>
  );
}

function EligibleStudentCard({ student }) {
  const { user } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h2>{student.owner}</h2>
        <div className={styles.studentInfoContainer}>
          <div className={styles.studentInfoRows}>
            <div className={styles.studentInfoRowDivs}>Phone Number:</div>
            {student.contactNumber}
          </div>
          <div className={styles.studentInfoRows}>
            <div className={styles.studentInfoRowDivs}>Mail: </div>
            {student.email}
          </div>
        </div>
      </div>
      <div className={styles.cardButtons}>
        <div className={styles.buttons}>
          <FileUploader
            studentId={student.id}
            studentEmail={student.email}
            setPopupOpen={setPopupOpen}
            setError={setError}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      {popupOpen && (
        <Popup
          content={"SSI certificate is uploaded."}
          isOpen={popupOpen}
          setIsOpen={setPopupOpen}
        />
      )}
    </div>
  );
}

export default EligibleStudentCard;

import axios from "axios";
import mime from "mime";
import React, { useContext, useRef } from "react";
import { UserContext } from "../../context/UserProvider";
import styles from "./eligible-student.module.css";

function FileUploader({ companyId, studentEmail }) {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadFile = (fileUploaded) => {
    const formData = new FormData();
    formData.append("companyId", companyId);
    formData.append("studentEmail", studentEmail);
    formData.append("file", fileUploaded);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/internship-applications/upload-application-form`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
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
          <FileUploader companyId={user.id} studentEmail={student.mail} />
        </div>
      </div>
    </div>
  );
}

export default EligibleStudentCard;

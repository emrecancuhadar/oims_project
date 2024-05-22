import axios from "axios";
import mime from "mime";
import React, { useContext, useRef } from "react";
import { UserContext } from "../../context/UserProvider";
import styles from "./intern-card.module.css";

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
        Upload Application Form
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

function InternCard({ student, isPending }) {
  const { user } = useContext(UserContext);

  const downloadApplicationForm = () => {
    const formData = new FormData();
    formData.append("companyId", user.id);
    formData.append("studentEmail", student.mail);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/internship-applications/download-application-form`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        //FIXME dosya adı alınamıyor. Content-disposition gelmiyor.
        // Extract the filename from the Content-Disposition header
        console.log(response.data);
        const contentDisposition = response.headers["content-disposition"];
        let fileName = "Application Form";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch.length === 2) {
            fileName = fileNameMatch[1];
          }
        }

        const contentType = response.headers["content-type"];
        const fileExtension = mime.getExtension(contentType) || "bin";
        fileName += `.${fileExtension}`;

        // Create a URL for the Blob and trigger a download
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // You can set a default filename here
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h2>{student.name}</h2>
        <div className={styles.studentInfoContainer}>
          <div className={styles.studentInfoRows}>
            <div className={styles.studentInfoRowDivs}>Phone Number:</div>
            {student.phoneNumber}
          </div>
          <div className={styles.studentInfoRows}>
            <div className={styles.studentInfoRowDivs}>Mail: </div>
            {student.mail}
          </div>
        </div>
      </div>
      {!isPending && (
        <div className={styles.cardButtons}>
          <div className={styles.buttons}>
            <FileUploader companyId={user.id} studentEmail={student.mail} />
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.downloadBtn}
              onClick={downloadApplicationForm}
            >
              Download Application Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InternCard;

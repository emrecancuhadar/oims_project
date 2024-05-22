import Modal from "@mui/material/Modal";
import axios from "axios";
import mime from "mime";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/DepSecEligibleStudents.module.css";
import DepSecSidebar from "../components/DepSecSidebar";
import Header from "../components/Header";
import Popup from "../components/Popup";
import { UserContext } from "../context/UserProvider";
import EligibleStudentCard from "../components/EligibleStudentCard";

function DepSecEligibleStudents() {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");

  const downloadEligibleStudentPdf = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/get-eligible-students-pdf`, {
        responseType: "blob",
      })
      .then((response) => {
        const contentDisposition = response.headers["content-disposition"];
        let fileName = "eligible_students.pdf";
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1];
          }
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading PDF:", error));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/eligible-students`)
      .then((response) => {
        const data = response.data;
        console.log("eligible-students", data);
        setStudents(
          data.map(({ id, fullName, email, contactNumber }) => ({
            id,
            owner: fullName,
            email,
            contactNumber,
          }))
        );
      })
      .catch((error) => console.error("Error fetching eligible students:", error));
  }, []);

  return (
    <div className={styles.DepSecEligibleStudents}>
      <DepSecSidebar />
      <div className={styles.DepSecEligibleStudentsMainContent}>
        <Header username={user.name} />
        <div className={styles.homepage}>
          <div className={styles.titleContainer}>
            <h1>Eligible Students</h1>
          </div>
          <div className={styles.downloadPdfContainer}>
            <button className={styles.downloadPdfBtn} onClick={downloadEligibleStudentPdf}>
              Download Pdf
            </button>
          </div>
          <div className={styles.homepageContainer}>
            {students.map((student, index) => (
              <EligibleStudentCard key={index} student={student} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepSecEligibleStudents;

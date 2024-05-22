import Modal from "@mui/material/Modal";
import axios from "axios";
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
  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/eligible-students`)
      .then((response) => {
        const data = response.data;
        console.log("eligible-students", data);
        setStudents(
          data.map(
            ({
              id,
              fullName,
              email , 
              contactNumber,
            }) => ({
              id,
              owner: fullName,
              email,
              contactNumber,
            })
          )
        );
      });
  }, []);

// const StudentEntries = ({ student }) => (
//   <div className={styles.card}>
//     <div>
//       <h2>{student.name}</h2>
//       <div className={styles.numberAndMail}>
//         <p>
//           <span>Phone Number:</span> {student.phoneNumber}
//         </p>
//         <p>
//           <span>Mail:</span> {student.mail}
//         </p>
//       </div>
//     </div>
//   </div>
// );

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
          <button className={styles.downloadPdfBtn}>
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

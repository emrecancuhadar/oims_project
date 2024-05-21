import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/DepSecEligibleStudents.module.css";
import DepSecSidebar from "../components/DepSecSidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";


function DepSecEligibleStudents() {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  
  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_API_URL}/depsec/eligible-students/${user.id}`)
    .then((response) => {
        const data = response.data;
        console.log("eligible-students", data);
        setStudents(
          data.map(({ id, fullName, email, contactNumber }) => ({
            id,
            fullName,
            email,
            contactNumber,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching interns:", error);
      });
  }, [user.id]);

const StudentEntries = ({ student }) => (
  <div className={styles.card}>
    <div>
      <h2>{student.name}</h2>
      <div className={styles.numberAndMail}>
        <p>
          <span>Phone Number:</span> {student.phoneNumber}
        </p>
        <p>
          <span>Mail:</span> {student.mail}
        </p>
      </div>
    </div>
  </div>
);

  return (
    <div className={styles.DepSecEligibleStudents}>
      <DepSecSidebar />
      <div className={styles.DepSecEligibleStudentsMainContent}>
        <Header username={user.name} />
        <div className={styles.homepage}>
          <div className={styles.titleContainer}>
            <h1>Eligible Students</h1>
          </div>
          <div className={styles.homepageContainer}>
            <div className={styles.cardContainer}>
              {students.map((student) => (
                <StudentEntries key={student.id} student={student} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepSecEligibleStudents;

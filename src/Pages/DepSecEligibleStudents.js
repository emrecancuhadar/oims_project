import React, { useContext } from "react";
import styles from "../CSS/DepSecEligibleStudents.module.css";
import DepSecSidebar from "../components/DepSecSidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";

const studentData = [
  {
    id: "1",
    name: "Emrecan Çuhadar",
    mail: "emrecancuhadar@hotmail.com",
    phoneNumber: "0555 555 5555",
  },
  {
    id: "2",
    name: "Emre Erol",
    mail: "emreerol@example.com",
    phoneNumber: "0444 444 4444",
  },
  {
    id: "3",
    name: "Onur Sahinler",
    mail: "onursahinler@std.iyte.edu.tr",
    phoneNumber: "0333 333 3333",
  },
  {
    id: "4",
    name: "Arda Polat",
    mail: "arda_polat1923@gmail.com",
    phoneNumber: "0222 222 2222",
  },
  {
    id: "5",
    name: "Berk Sengul",
    mail: "sengul_berk2@example.com",
    phoneNumber: "0111 111 1111",
  },
  {
    id: "6",
    name: "Cagan Ozsir",
    mail: "caganozsir@example.com",
    phoneNumber: "0666 666 6666",
  },
];

const StudentEntries = ({ student }) => (
  <div className={styles.card}>
    <div className={styles.cardTitle}>
      <h5>{student.name}</h5>
    </div>
    <div className={styles.cardBody}>
      <h5>{student.mail}</h5>
    </div>
    <div className={styles.cardBody}>
      <h5>{student.phoneNumber}</h5>
    </div>
  </div>
);

function DepSecEligibleStudents() {
  const { user } = useContext(UserContext);

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
              {studentData.map((student) => (
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

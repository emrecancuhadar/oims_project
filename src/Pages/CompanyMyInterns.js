import React, { useContext } from "react";
import styles from "../CSS/CompanyMyInterns.module.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";

const studentData = [
  {
    id: "1",
    name: "Emrecan Çuhadar",
    mail: "emrecancuhadar@hotmail.com",
    phoneNumber: "0555 555 5555",
    status: "Not approved yet.",
  },
  {
    id: "2",
    name: "Jane Doe",
    mail: "janedoe@example.com",
    phoneNumber: "0444 444 4444",
    status: "Not approved yet.",
  },
  {
    id: "3",
    name: "John Smith",
    mail: "johnsmith@example.com",
    phoneNumber: "0333 333 3333",
    status: "Not approved yet.",
  },
  {
    id: "4",
    name: "Alice Johnson",
    mail: "alicejohnson@example.com",
    phoneNumber: "0222 222 2222",
    status: "Not approved yet.",
  },
  {
    id: "5",
    name: "Alice Johnson",
    mail: "alicejohnson@example.com",
    phoneNumber: "0222 222 2222",
    status: "Not approved yet.",
  },
  {
    id: "6",
    name: "Alice Johnson",
    mail: "alicejohnson@example.com",
    phoneNumber: "0222 222 2222",
    status: "Not approved yet.",
  },
];

const StudentEntries = ({ student }) => (
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
        <div className={styles.studentInfoRows}>
          <div className={styles.studentInfoRowDivs}>Status: </div>
          {student.status}
        </div>
      </div>
    </div>
    <div className={styles.cardButtons}>
      <div className={styles.buttons}>
        <button className={styles.uploadBtn}>Upload Application Form</button>
      </div>
      <div className={styles.buttons}>
        <button className={styles.downloadBtn}>
          Download Application Form
        </button>
      </div>
    </div>
  </div>
);

function CompanyMyInterns() {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.CompanyMyInterns}>
      <CompanySidebar />
      <div className={styles.companyMyInternshipsMainContent}>
        <Header username={user.name} />
        <div className={styles.homepage}>
          <div className={styles.titleContainer}>
            <h1>My Interns</h1>
          </div>
          <div className={styles.addInternContainer}>
            <button className={styles.addInternBtn}>Add Intern</button>
          </div>
          <div className={styles.homepageContainer}>
            {studentData.map((student) => (
              <StudentEntries key={student.id} student={student} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMyInterns;

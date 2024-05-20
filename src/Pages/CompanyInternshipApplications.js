import React, { useContext } from "react";
import styles from "../CSS/CompanyInternshipApplications.module.css";
import CompanySidebar from "../components/CompanySidebar";
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
    name: "Jane Doe",
    mail: "janedoe@example.com",
    phoneNumber: "0444 444 4444",
  },
  {
    id: "3",
    name: "John Smith",
    mail: "johnsmith@example.com",
    phoneNumber: "0333 333 3333",
  },
  {
    id: "4",
    name: "Alice Johnson",
    mail: "alicejohnson@example.com",
    phoneNumber: "0222 222 2222",
  },
  {
    id: "5",
    name: "Alice Johnson",
    mail: "alicejohnson@example.com",
    phoneNumber: "0222 222 2222",
  },
  
];



const StudentEntries = ({ student }) => (
  <div className={styles.card}>
    <div className={styles.cardBody}>
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
function CompanyInternshipApplications() {
  const { user } = useContext(UserContext);

  return (
      <div className={styles.CompanyInternshipApplications}>
      <CompanySidebar />
        <div className={styles.companyMyInternshipsMainContent}>
          <Header username={user.name} />
          <div className={styles.homepage}>
            <div className={styles.titleContainer}>
              <h1>Internship Applications</h1>
            </div>
            <div className={styles.homepageContainer}>
            {studentData.map(student => (
                <StudentEntries key={student.id} student={student} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default CompanyInternshipApplications;

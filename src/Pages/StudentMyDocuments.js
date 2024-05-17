import React, { useContext, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";
import InternshipOpportunity from "../components/InternshipOpportunity";

function StudentMyDocuments() {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.studentInternshipOpps}>
      <StudentSidebar />
      <div className={styles.mainContent}>
          <Header username={user.name} />
        <div className={styles.internships}>
          <div className={styles.titleContainer}>
            <h1>My Documents</h1>
          </div>
        </div>
    </div>
  </div>
  )
}

export default StudentMyDocuments
import React, { useContext, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";
import InternshipOpportunity from "../components/InternshipOpportunity";


function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [opportunities, setOpportunities] = useState([
    {id: 1, title: 'Internship 1', content: 'Backend Developer'},
    {id: 2, title: 'Internship 2', content: 'Frontend Developer'},
    {id: 3, title: 'Internship 3', content: 'SUBMARINER'},
    {id: 4, title: 'Internship 4', content: 'Arabada bulututum yok ama kızlar'},
  ])

  return (
    <div className={styles.studentInternshipOpps}>
      <StudentSidebar />
      <div className={styles.mainContent}>
          <Header username={user.name} />
        <div className={styles.internships}>
          <div className={styles.titleContainer}>
            <h1>Internship Opportunities</h1>
          </div>
          <div className={styles.internshipsContainer}>
            {opportunities.map((opportunity) => (
              <InternshipOpportunity key={opportunity.id} opportunity={opportunity}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInternshipOpportunities;

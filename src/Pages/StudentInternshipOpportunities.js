import React, { useContext, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";
import InternshipOpportunity from "../components/InternshipOpportunity";


function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [opportunities, setOpportunities] = useState([
    {id: 1, companyName: 'Davon', content: 'Bekirin yerine adam', email: 'davon@davon.com'},
    {id: 2, companyName: 'Research Ecosystems', content: 'Köle', email: 'tugkantuglular@iyte.edu.tr'},
    {id: 3, companyName: 'Google Inc.', content: 'Backend Developer', email: 'google@gmail.com'},
    {id: 4, companyName: 'Microsoft', content: 'Frontend Developer', email: 'microsoft@gmail.com'},
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

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import InternshipOpportunity from "../components/InternshipOpportunity";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

// TODO pop-up a bir yüklenme ekranı eklenebilir.

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/announcements/approved`)
      .then((response) => {
        const opportunitiesData = response.data;
        setOpportunities(
          opportunitiesData.map(
            ({
              announcementId,
              title,
              deadline,
              company: { companyName, email },
              document: { content },
            }) => ({
              id: announcementId,
              companyName,
              title,
              email,
              deadline,
              content,
            })
          )
        );
      });
  }, []);

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
              <InternshipOpportunity
                key={opportunity.id}
                opportunity={opportunity}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInternshipOpportunities;

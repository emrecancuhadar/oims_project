import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/CompanyMyAnnouncements.module.css";
import CompanyAnnouncement from "../components/CompanyAnnouncement";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";

function CompanyMyAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/announcements/company/${user.id}`)
      .then((response) => {
        const data = response.data;
        setAnnouncements(
          data.map(({ announcementId, title, deadline, document }) => ({
            id: announcementId,
            documentId: document.documentId,
            title,
            deadline,
            content: document.content,
            status: document.status,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, [user.id]);
  

  return (
    <div className={styles.companyMyAnnouncements}>
      <CompanySidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.announcementsPageContainer}>
          <h1 className={styles.pageTitle}>My Announcements</h1>
          <div className={styles.announcementsContainer}>
            {announcements.map((announcement, index) => (
              <CompanyAnnouncement key={index} announcement={announcement} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMyAnnouncements;

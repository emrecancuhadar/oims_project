import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/AdminAnnouncementRequests.module.css";
import AnnouncementRequest from "../components/AnnouncementRequest";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";
import { UserContext } from "../context/UserProvider";

function AdminAnnouncementRequests() {
  const [announcementRequests, setAnnouncementRequests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/announcements/pending`)
      .then((response) => {
        const data = response.data;
        setAnnouncementRequests(
          data.map(({ title, deadline, document, company }) => ({
            id: document.documentId,
            title,
            deadline,
            content: document.content,
            companyId: company.id,
          }))
        );
      });
  }, []);

  return (
    <div className={styles.adminAnnoRequest}>
      <SystemAdminSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.announcements}>
          <h1 className={styles.pageTitle}>Announcement Requests</h1>
          <div className={styles.announcementRequestsContainer}>
            {announcementRequests.map((announcementRequest, index) => (
              <AnnouncementRequest
                key={index}
                announcementRequest={announcementRequest}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncementRequests;

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
    fetchPendingAnnouncements();
  }, []);

  const fetchPendingAnnouncements = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/announcements/pending`)
      .then((response) => {
        const data = response.data;
        setAnnouncementRequests(
          data.map(
            ({ announcementId, title, deadline, document, company }) => ({
              id: announcementId,
              title,
              deadline,
              content: document.content,
              companyId: company.id,
              companyName: company.companyName,
              documentId: document.documentId,
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching announcement requests:", error);
      });
  };

  const approveAnnouncement = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/document/${id}/approve`
      )
      .then((response) => {
        
        // Update the state to remove the approved announcement
        setAnnouncementRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  const disapproveAnnouncement = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/document/${id}/disapprove`
      )
      .then((response) => {
        
        // Update the state to remove the disapproved announcement
        setAnnouncementRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  const banCompany = (companyId) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyId}/ban`
      )
      .then((response) => {
        
        // Optionally, you could also remove announcements by the banned company
        setAnnouncementRequests((prevRequests) =>
          prevRequests.filter((request) => request.companyId !== companyId)
        );
      })
      .catch((error) => console.log(error));
  };

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
                onApprove={approveAnnouncement}
                onDisapprove={disapproveAnnouncement}
                onBan={banCompany}
                user={user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncementRequests;

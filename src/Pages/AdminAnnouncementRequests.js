import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/AdminAnnouncementRequests.module.css";
import AnnouncementRequest from "../components/AnnouncementRequest";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";
import { UserContext } from "../context/UserProvider";
import Popup from "../components/Popup";

function AdminAnnouncementRequests() {
  const [announcementRequests, setAnnouncementRequests] = useState([]);
  const { user } = useContext(UserContext);
  const [approvePopupOpen, setApprovePopupOpen] = useState(false);
  const [disapprovePopupOpen, setDisapprovePopupOpen] = useState(false);
  const [banPopupOpen, setBanPopupOpen] = useState(false);


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

  const approveAnnouncement = (documentId) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/document/${documentId}/approve`
      )
      .then((response) => {
        setApprovePopupOpen(true);
        // Update the state to remove the approved announcement
        setAnnouncementRequests((prevAnnouncementRequest) =>
          prevAnnouncementRequest.filter((announcementRequest) => announcementRequest.documentId !== documentId)
        );
      })
      .catch((error) => console.log(error));
  };

  const disapproveAnnouncement = (documentId) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/document/${documentId}/disapprove`
      )
      .then((response) => {
        setDisapprovePopupOpen(true);
        // Update the state to remove the disapproved announcement
        setAnnouncementRequests((prevAnnouncementRequest) =>
          prevAnnouncementRequest.filter((announcementRequest) => announcementRequest.documentId !== documentId)
        );
      })
      .catch((error) => console.log(error));
  };

  const banCompany = (companyId, documentId) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyId}/ban`
      )
      .then((response) => {
        setBanPopupOpen(true);
        // Optionally, you could also remove announcements by the banned company
        setAnnouncementRequests((prevAnnouncementRequest) =>
          prevAnnouncementRequest.filter((announcementRequest) => announcementRequest.companyId !== companyId)
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
              />
            ))}
          </div>
        </div>
      </div>
      {approvePopupOpen && (
          <Popup
            content={"Announcement is approved"}
            isOpen={approvePopupOpen}
            setIsOpen={setApprovePopupOpen}
          />
        )}
        {disapprovePopupOpen && (
          <Popup
            content={"Announcement is disapproved"}
            isOpen={disapprovePopupOpen}
            setIsOpen={setDisapprovePopupOpen}
          />
        )}
        {banPopupOpen && (
          <Popup
            content={"Company is banned"}
            isOpen={banPopupOpen}
            setIsOpen={setBanPopupOpen}
          />
        )}
    </div>
  );
}

export default AdminAnnouncementRequests;

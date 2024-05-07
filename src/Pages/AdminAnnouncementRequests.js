import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../CSS/AdminAnnouncementRequests.css";
import AnnouncementRequest from "../components/AnnouncementRequest";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";
import { UserContext } from "../context/UserProvider";

function AdminAnnouncementRequests() {
  const [announcementRequests, setAnnouncementRequests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:8081/announcements").then((response) => {
      const data = response.data;
      setAnnouncementRequests(
        data.map(
          ({
            title,
            deadline,
            document: { documentId, content },
            company: { id: companyId },
          }) => ({
            id: documentId,
            title,
            deadline,
            content,
            companyId,
          })
        )
      );
    });
  }, []);

  return (
    <div className="admin-annoRequest">
      <SystemAdminSidebar />
      <div className="main-content">
        <div className="header d-flex align-items-center">
          <Header username={user.name} />
        </div>
        <div className="announcements align-items-center">
          <h1>Announcement Requests</h1>
          <div className="announcement-requests-container">
            {announcementRequests.map((announcementRequest, index) => (
              <div key={index}>
                <AnnouncementRequest
                  announcementRequest={announcementRequest}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnnouncementRequests;

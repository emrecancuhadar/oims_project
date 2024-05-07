import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../CSS/CompanyMyAnnouncements.css";
import CompanyAnnouncement from "../components/CompanyAnnouncement";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";

function CompanyMyAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/announcements/company/${user.id}`)
      .then((response) => {
        const data = response.data;
        setAnnouncements(
          data.map(
            ({ title, deadline, document: { documentId, content } }) => ({
              id: documentId,
              title,
              deadline,
              content,
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, []);

  return (
    <div className="compmyann">
      <div className="student-homepage">
        <CompanySidebar />
        <div className="main-content">
          <div className="header d-flex align-items-center">
            <Header username={"Sample Company"} />
          </div>
          <div className="announcements-page-container row">
            <h1 className="page-title">My Announcements</h1>
            <div className="announcements-container">
              {announcements.map((announcement, index) => (
                <div key={index}>
                  <CompanyAnnouncement announcement={announcement} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMyAnnouncements;

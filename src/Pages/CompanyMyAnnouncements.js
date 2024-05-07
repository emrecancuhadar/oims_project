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
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
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

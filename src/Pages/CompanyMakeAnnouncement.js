import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyMakeAnnouncement.css";
import CompanySidebar from "../components/CompanySidebar";
import CompanyHeadbar from "../components/CompanyHeadbar";

function CompanyMakeAnnouncement() {
  const navigate = useNavigate();
  return (
    <div className="compmakeann">
      <div className="company-homepage">
        <CompanySidebar />
        <div className="main-content">
          <CompanyHeadbar />
          <div className="announcements-page-container row">
            <h1 className="page-title">Make Announcement</h1>
            <div className="announcements-container col-md-6">
              <div className="input-group input-group-lg">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  Title
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                ></input>
              </div>
              <div className="input-group input-group-lg">
                <input id="file-upload" type="file" className="form-control" />
              </div>
              <button className="send-btn btn">
                Send Announcement Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMakeAnnouncement;

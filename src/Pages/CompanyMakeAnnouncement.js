import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyMakeAnnouncement.css";
import Header from "../components/Header";
import CompanySidebar from "../components/CompanySidebar";

function CompanyMakeAnnouncement() {
  const navigate = useNavigate();

  const onSend = () => {
    axios.post("http://localhost:8081/announcements/upload");
  };

  return (
    <div className="compmakeann">
      <div className="company-homepage">
        <CompanySidebar />
        <div className="main-content">
          <div className="header d-flex align-items-center">
            <Header username={"Sample Company"} />
          </div>
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
              <button className="send-btn btn" onClick={onSend}>
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

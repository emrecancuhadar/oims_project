import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyMakeAnnouncement.css";

function CompanyMakeAnnouncement() {
  const navigate = useNavigate();
  return (
    <div className="compmakeann">
      <div className="company-homepage">
        <div className="sidebar">
          <a href="/" className="sidebar-container">
            <img className="sidebar-logo" src={require("../assets/images/iyte_logo.png")} alt="xd"></img>
          </a>
          <button
            onClick={() => navigate("/company/home")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/my-announcements")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            My Announcements
          </button>
          <button
            onClick={() => navigate("/make-announcement")}
            className="btn btn-dark w-100 mt-2 pt-2 pb-2"
          >
            Make Announcement
          </button>
          <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
            Internship Applications
          </button>
          <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
            My Interns
          </button>
        </div>
        <div className="main-content">
          <div className="header d-flex align-items-center">
            <span className="user-name">Name Surname - Company</span>
            <i className="far fa-user-circle user-icon"></i>
          </div>
          <div className="announcements container">
            <h1 className="page-title">Make Announcement</h1>
            <div className="row announcement-container">
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
            </div>
            <div className="col-md-3 container">
              <button className="btn btn-dark send-btn">
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

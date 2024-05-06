import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyHomepage.css";

function CompanyHomepage() {
  const navigate = useNavigate();
  return (
    <div className="comphome">
      <div className="company-homepage">
        <div className="company-sidebar">
          <a href="/" class="sidebar-container">
            <img className="sidebar-logo" src={require("../assets/images/iyte_logo.png")} alt="xd"></img>
          </a>
          <button
            onClick={() => navigate("/company/home")}
            className="btn btn-dark w-100 mt-2 pt-2 pb-2"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/registrationrequests")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Company Registration Requests
          </button>
          <button
            onClick={() => navigate("/announcementrequests")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Announcement Requests
          </button>
        </div>
        <div className="main-content">
          <div className="header d-flex align-items-center">
            <span className="user-name">Iztech User - System Admin</span>
            <i className="far fa-user-circle user-icon"></i>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default CompanyHomepage;

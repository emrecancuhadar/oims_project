import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyMyAnnouncements.css";

const announcements = [
  { id: 1, title: "Announcement 1" },
  { id: 2, title: "Announcement 2" },
  { id: 3, title: "Announcement 3" },
];

function CompanyMyAnnouncements() {
  const handleActionClick = (action, id) => {
    alert(`${action} clicked for announcements ${id}`);
  };

  const handleContentClick = () => {
    // Placeholder for opening PDF
    alert("Content Clicked!");
  };
  const navigate = useNavigate();

  return (
    <div className="compmyann">
      <div className="student-homepage">
        <div className="sidebar">
          <a href="/" class="sidebar-container">
            <img className="sidebar-logo" src={require("../assets/images/iyte_logo.png")}></img>
          </a>
          <button
            onClick={() => navigate("/company/home")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/my-announcements")}
            className="btn btn-dark w-100 mt-2 pt-2 pb-2"
          >
            My Announcements
          </button>
          <button
            onClick={() => navigate("/make-announcement")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
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
            <span className="user-name">Company Name - Company</span>
            <i className="far fa-user-circle user-icon"></i>
          </div>
          <div className="announcements-page-container row">
            <h1 className="page-title">My Announcements</h1>
            <div className="row announcements-container">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <h5
                        className="card-title"
                        onClick={handleContentClick}
                        style={{ cursor: "pointer" }}
                      >
                        {announcement.title}
                      </h5>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                      >
                        <button
                          onClick={() =>
                            handleActionClick("Edit", announcement.id)
                          }
                          className="btn btn-dark"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleActionClick("Delete", announcement.id)
                          }
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
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

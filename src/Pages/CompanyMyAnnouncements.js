import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyMyAnnouncements.css";
import CompanySidebar from "../components/CompanySidebar"
import CompanyHeadbar from "../components/CompanyHeadbar";

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
        <CompanySidebar />
        <div className="main-content">
          <CompanyHeadbar />
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

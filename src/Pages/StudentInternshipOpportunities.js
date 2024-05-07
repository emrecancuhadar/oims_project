import React, { useContext } from "react";
import "../CSS/StudentInternshipOpportunities.css";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

const internships = [
  { id: 1, title: "Internship 1" },
  { id: 2, title: "Internship 2" },
  { id: 3, title: "Internship 3" },
];

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);

  const handleActionClick = (action, id) => {
    alert(`${action} clicked for internships ${id}`);
  };

  const handleContentClick = () => {
    // Placeholder for opening PDF
    alert("Content Clicked!");
  };

  return (
    <div className="student-internshipOpps">
      <StudentSidebar />
      <div className="main-content">
        <div className="header d-flex align-items-center">
          <Header username={user.name} />
        </div>
        <div className="internships">
          <div className="title-container">
            <h1 className="page-title">Internship Opportunities</h1>
          </div>
          <div className="row internships-container">
            {internships.map((internship) => (
              <div key={internship.id} className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5
                      className="card-title"
                      onClick={handleContentClick}
                      style={{ cursor: "pointer" }}
                    >
                      {internship.title}
                    </h5>
                    <button
                      onClick={() => handleActionClick("Apply", internship.id)}
                      className="btn btn-dark"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInternshipOpportunities;

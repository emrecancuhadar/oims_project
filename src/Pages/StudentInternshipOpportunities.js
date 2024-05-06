import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/StudentInternshipOpportunities.css";
import Header from "../components/Header";
const internships = [
  { id: 1, title: "Internship 1" },
  { id: 2, title: "Internship 2" },
  { id: 3, title: "Internship 3" },
];

function StudentInternshipOpportunities() {
  const handleActionClick = (action, id) => {
    alert(`${action} clicked for internships ${id}`);
  };

  const handleContentClick = () => {
    // Placeholder for opening PDF
    alert("Content Clicked!");
  };
  const navigate = useNavigate();

  return (
    <div className="student-internshipOpps">
      <div className="sidebar">
        <a href="/" className="sidebar-container">
          <img
            className="sidebar-logo"
            src={require("../assets/images/iyte_logo.png")}
            alt="xd"
          ></img>
        </a>
        <button
          onClick={() => navigate("/student/home")}
          className="btn btn-light w-100 mt-2 pt-2 pb-2"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/internship-opportunities")}
          className="btn btn-dark w-100 mt-2 pt-2 pb-2"
        >
          Internship Opportunities
        </button>
        <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
          Applied Internships
        </button>
        <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
          My Documents
        </button>
      </div>
      <div className="main-content">
        <div className="header d-flex align-items-center">
          <Header username={"Test Student"} />
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

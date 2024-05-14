import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./studentSidebar.module.css";

function StudentSidebar() {
  const navigate = useNavigate();
  return (
    <div className={styles.studentSidebar}>
      <img
        className={styles.sidebarLogo}
        alt="IYTE Logo"
        src={require("../../assets/images/iyte_logo.png")}
      ></img>
      <button
        onClick={() => navigate("/student/home")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Home
      </button>
      <button
        onClick={() => navigate("/student/internship-opportunities")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Internship Opportunities
      </button>
      <button 
        onClick={() => navigate("/student/applied-internships")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Applied Internships
      </button>
      <button 
        onClick={() => navigate("/student/my-documents")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        My Documents
      </button> 
    </div>
  );
}

export default StudentSidebar;

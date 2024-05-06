import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./companySidebar.module.css"

function CompanySidebar () {
    const navigate = useNavigate();
    return (
        <div className={styles.companySidebar}>
          <img className="sidebar-logo" src={require("../../assets/images/iyte_logo.png")} alt="Problem"></img>
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
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Make Announcement
          </button>
          {/* <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
            Internship Applications
          </button>
          <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
            My Interns
          </button> */}
        </div>
    )
}

export default CompanySidebar;
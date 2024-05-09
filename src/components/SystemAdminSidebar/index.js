import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./systemAdminSidebar.module.css"

function SystemAdminSidebar() {
    const navigate = useNavigate();
    return (
        <div className={styles.systemAdminSidebar}>
          <img
            className={styles.sidebarLogo}
            src={require("../../assets/images/iyte_logo.png")}
            alt="Problem"
          ></img>
          <button
            onClick={() => navigate("/admin/homepage")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/admin/registrationrequests")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Registration Requests
          </button>
          <button
            onClick={() => navigate("/admin/announcementrequests")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Announcement Requests
          </button>
        </div>
    )
}

export default SystemAdminSidebar;
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import styles from "./companySidebar.module.css";

function CompanySidebar() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className={styles.companySidebar}>
      <img
        className={styles.sidebarLogo}
        src={require("../../assets/images/iyte_logo.png")}
        alt="xd"
      ></img>
      <button
        onClick={() => navigate("/company/home")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Home
      </button>
      <button
        onClick={() => navigate("/company/my-announcements")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        My Announcements
      </button>
      <button
        onClick={() => navigate("/company/make-announcement")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
        disabled={user.registrationStatus === "PENDING"}
      >
        Make Announcement
      </button>
      <button 
        onClick={() => navigate("/company/my-applicants")} 
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        My Applicants
      </button>
      <button 
        onClick={() => navigate("/company/my-interns")} 
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        My Interns
      </button>

    </div>
  );
}

export default CompanySidebar;

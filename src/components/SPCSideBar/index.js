import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SPCSidebar.module.css";

function SPCSidebar() {
  const navigate = useNavigate();
  return (
    <div className={styles.SPCSidebar}>
      <img
        className={styles.sidebarLogo}
        alt="IYTE Logo"
        src={require("../../assets/images/iyte_logo.png")}
      ></img>
      <button
        onClick={() => navigate("/spc/home")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Home
      </button>
      <button
        onClick={() => navigate("/spc/application-forms")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Application Forms
      </button>
    </div>
  );
}

export default SPCSidebar;

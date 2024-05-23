import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DepSecSidebar.module.css";

function DepSecSidebar() {
  const navigate = useNavigate();
  return (
    <div className={styles.depSecSidebar}>
      <img
        className={styles.sidebarLogo}
        alt="IYTE Logo"
        src={require("../../assets/images/iyte_logo.png")}
      ></img>
      <button
        onClick={() => navigate("/depsec/home")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Home
      </button>
      <button
        onClick={() => navigate("/depsec/eligible-students")}
        className="btn btn-light w-100 mt-2 pt-2 pb-2"
      >
        Eligible Students
      </button>
    </div>
  );
}

export default DepSecSidebar;

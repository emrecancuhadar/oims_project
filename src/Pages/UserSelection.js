import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/UserSelection.module.css";

function UserSelection() {
  const navigate = useNavigate();
  return (
    <div className={styles.mainScreen}>
      <div className={styles.centerBox}>
        <img
          className={styles.image}
          src={require("../assets/images/iyte_logo.png")}
          alt="OIMS Logo"
        />
        <h1>Welcome to OIMS!</h1>
        <h4>Please select your user type</h4>
        <div className={styles.buttonContainer}>
          <button
            className={styles.userButton}
            onClick={() => navigate("/iztech-user/login")}
          >
            IZTECH User
          </button>
          <button
            className={styles.userButton}
            onClick={() => navigate("/company/login")}
          >
            Company
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSelection;

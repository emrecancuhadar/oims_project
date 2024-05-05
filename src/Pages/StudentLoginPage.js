import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/StudentLoginPage.module.css";

function StudentLoginPage() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.logincontainer}>
      <div className={styles.loginbox}>
        <img
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
          width="130"
        />
        <label>
          Student ID:
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button onClick={() => navigate("/student/home")}>Login</button>
        <p onClick={() => alert("Reset Password Clicked")}>Reset password?</p>
      </div>
    </div>
  );
}

export default StudentLoginPage;

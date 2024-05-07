import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/IztechUserLoginPage.module.css";

function IztechUserLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (credentials) => {
    if (username.includes("@")) {
      credentials = { email: username, password };
    } else {
      credentials = { id: username, password };
    }

    axios
      .post("http://localhost:8081/iztech-user/login", credentials)
      .then((response) => {
        const role = response.data.role;
        switch (role) {
          case "STUDENT":
            navigate("/student/home");
            break;
          case "SYSTEM_ADMIN":
            navigate("/admin/homepage");
            break;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.logincontainer}>
      <div className={styles.loginbox}>
        <img
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
          width="200"
        />
        <label>
          ID or E-mail:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button onClick={() => login({ username, password })}>Login</button>
        <p onClick={() => alert("Reset Password Clicked")}>
          Forgot my password
        </p>
      </div>
    </div>
  );
}

export default IztechUserLoginPage;

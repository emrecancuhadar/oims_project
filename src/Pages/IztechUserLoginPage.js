import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/IztechUserLoginPage.module.css";
import { UserContext } from "../context/UserProvider";

function IztechUserLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(UserContext);

  const login = (credentials) => {
    if (username.includes("@")) {
      credentials = { email: username, password };
    } else {
      credentials = { id: username, password };
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/iztech-user/login`, credentials)
      .then((response) => {
        const role = response.data.role;
        loginUser({ id: response.data.id, name: response.data.fullName });
        switch (role) {
          case "STUDENT":
            navigate("/student/home");
            break;
          case "SYSTEM_ADMIN":
            navigate("/admin/homepage");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Login credentials are not correct!");
      });
  };

  return (
    <div className={styles.logincontainer}>
      <div className={styles.loginbox}>
        <img
          className={styles.image}
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
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

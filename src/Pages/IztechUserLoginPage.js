import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/IztechUserLoginPage.module.css";
import { UserContext } from "../context/UserProvider";
import Popup from "../components/Popup";

function IztechUserLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [wrongPopupOpen, wrongSetPopupOpen] = useState(false);

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
        loginUser({
          id: response.data.id,
          name: response.data.fullName,
          role: role.toLowerCase(),
        });
        setPopupOpen(true);
        switch (role) {
          case "STUDENT":
            setTimeout(() => {
              navigate("/student/home");
          }, 3000);
            break;
          case "SYSTEM_ADMIN":
            setTimeout(() => {
              navigate("/admin/homepage");
          }, 3000);
            break;
          case "SUMMER_PRACTICE_COORDINATOR":
            setTimeout(() => {
              navigate("/spc/home");
          }, 3000);
            break;
          case "DEPARTMENT_SECRETARY":
            setTimeout(() => {
              navigate("/depsec/home");
          }, 3000);
            break;
          
        }
      })
      .catch((error) => {
        console.log(error);
        wrongSetPopupOpen(true);
      });
  };

  const SigninPopupContent = () => (
    <div className={styles.popupContent}>
      <p>Your credentials are correct.</p>
      <p>You will be directed to home page in 3 seconds.</p>
    </div>
  );

  const WrongPopupContent = () => (
    <div className={styles.popupContent}>
      <button className={styles.closeBtn} onClick={() => wrongSetPopupOpen(false)}>
          &times;
        </button>
      <p>The email or password you entered is incorrect.</p>
      <p>Check your credentials or sign up for an account.</p>
    </div>
  );

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
        <p onClick={() => window.open("https://ubys.iyte.edu.tr/#")}>
          Forgot my password
        </p>
      </div>
      {popupOpen && (
            <Popup
              content={<SigninPopupContent />} 
              isOpen={popupOpen}
              setIsOpen={setPopupOpen}
            />
          )};
      {wrongPopupOpen && (
            <Popup
              content={<WrongPopupContent />} 
              isOpen={wrongPopupOpen}
              setIsOpen={wrongSetPopupOpen}
            />
          )}
    </div>
  );
}

export default IztechUserLoginPage;

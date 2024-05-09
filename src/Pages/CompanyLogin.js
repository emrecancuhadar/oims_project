import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/CompanyLogin.module.css"; // Updated import
import { UserContext } from "../context/UserProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/company/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        response.json().then((data) => {
          loginUser({
            id: data.id,
            name: data.companyName,
            email: data.email,
            registrationStatus: data.registrationStatus,
          });
        });
        navigate("/company/home");
      } else {
        const errorMessage = await response.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.companyLoginContainer}>
      <div className={styles.companyLoginBox}>
        <img
          className={styles.logoImage}
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
        />
        <form className={styles.formContainer} onSubmit={handleLogin}>
          <label className={styles.cmpLabelContainer}>
            E-mail:
            <input
              className={styles.inputField}
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.cmpLabelContainer}>
            Password:
            <input
              className={styles.inputField}
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className={styles.button} type="submit">Login</button>
        </form>
        <p className={styles.para} onClick={() => navigate("/company/signup")}>
          Sign up now!
        </p>
        <p className={styles.para} onClick={() => navigate("/company/resetpassword")}>
          Forgot my password
        </p>
      </div>
    </div>
  );
}

export default Login;

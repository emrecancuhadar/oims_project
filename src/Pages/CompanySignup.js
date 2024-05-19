import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/CompanySignup.module.css";
import PasswordChecklist from "react-password-checklist";

function Signup() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/signUp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyName, email, password }),
        }
      );

      if (response.ok) {
        navigate("/company/login");
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
    <div className={styles.cmpSignUpContainer}>
      <div className={styles.cmpSignupBox}>
        <img
          className={styles.logoImage}
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
        />
        <form className={styles.formContainer} onSubmit={handleSignup}>
          <label>
            Name of Company:
            <input
              className={styles.inputField}
              type="text"
              value={companyName}
              required
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>
          <label>
            E-mail:
            <input
              className={styles.inputField}
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              className={styles.inputField}
              type="password"
              value={password}
              minLength={8}
              maxLength={28}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Confirm Password:
            <input
              className={styles.inputField}
              type="password"
              value={passwordAgain}
              minLength={8}
              maxLength={28}
              required
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </label>
          <PasswordChecklist
            className="passwordcheck"
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            onChange={(isValid) => {}}
          />
          <button className={styles.signUpButton} type="submit">
            Sign Up
          </button>
        </form>
        <p className={styles.para} onClick={() => navigate("/company/login")}>
          Sign in now!
        </p>
      </div>
    </div>
  );
}

export default Signup;

import axios from "axios";
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/CompanySignup.module.css";
import Popup from "../components/Popup";

function Signup() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPasswordCriteriaMessage, setShowPasswordCriteriaMessage] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      setShowPasswordCriteriaMessage(true);
      return;
    }
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/company/signUp`, {
          companyName,
          email,
          password,
        })
        .then((response) => {
          if (response.status == 200) {
            setShowPasswordCriteriaMessage(false);
            setTimeout(() => {
              navigate("/company/login");
            }, 3000);
          } else {
            const errorMessage = response.data.error;
            setErrorMessage(errorMessage);
            setErrorPopupOpen(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 500) {
              setErrorMessage(error.response.data);
              setErrorPopupOpen(true);
            }
          }
        });
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setErrorPopupOpen(true);
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
              type="text"
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
            onChange={(isValid) => setIsPasswordValid(isValid)}
          />
          {showPasswordCriteriaMessage && !isPasswordValid && (
            <p style={{ color: "red" }}>Password must meet the requirements.</p>
          )}
          <button className={styles.signUpButton} type="submit">
            Sign Up
          </button>
        </form>
        <p className={styles.para} onClick={() => navigate("/company/login")}>
          Sign in now!
        </p>
      </div>
      {errorPopupOpen && (
        <Popup
          content={errorMessage}
          isOpen={errorPopupOpen}
          setIsOpen={setErrorPopupOpen}
        />
      )}
    </div>
  );
}

export default Signup;

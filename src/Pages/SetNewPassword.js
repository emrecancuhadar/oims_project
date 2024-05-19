import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../CSS/SetNewPassword.module.css";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";

function SetNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenParam = queryParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError("No token provided.");
      navigate("/");
    }
  }, [location, navigate]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!passwordIsValid) {
      setError("Password does not meet all requirements.");
      return;
    }

    const formData = new FormData();
    formData.append("newPassword", password);
    formData.append("token", token);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/security/company/savePassword`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setSuccess(true);
        setError("");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to update password. Please try again.");
      });
  };

  return (
    <div className={styles.cmpSetNewPasswordContainer}>
      <div className={styles.cmpSetNewPasswordBox}>
        <img
          className={styles.logoImage}
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
        />
        <h2>Set New Password</h2>
        {success ? (
          navigate("/company/login")
        ) : (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <label htmlFor="password">
              New Password:
              <input
                type="password"
                id="password"
                className={styles.inputField}
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </label>

            <label htmlFor="confirmPassword">
              Confirm Password:
              <input
                type="password"
                id="confirmPassword"
                className={styles.inputField}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </label>
            {error && <div className="error-message">{error}</div>}
            <PasswordChecklist
              className="passwordcheck"
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={confirmPassword}
              onChange={(isValid) => setPasswordIsValid(isValid)}
            />
            <button type="submit" className={styles.submitButton}>
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SetNewPassword;

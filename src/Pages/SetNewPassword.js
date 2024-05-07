import axios from "axios";
import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";
import "../CSS/SetNewPassword.css";

function SetNewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [success, setSuccess] = useState(false);

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
    // Assuming password setting logic is successful here
    console.log("New password is set:", password);

    const formData = new FormData();
    formData.append("password", password);

    axios
      .post("http://localhost:8081/security/company/savePassword", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccess(true);
        setError("");
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="setNewPasswordPage">
      <div className="set-new-password-container">
        <img src={require("../assets/images/iyte_logo.png")} alt="IYTE Logo" />
        <h2>Set New Password</h2>
        {success ? (
          navigate("/company/login")
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <PasswordChecklist
              className="passwordcheck"
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={confirmPassword}
              onChange={(isValid) => setPasswordIsValid(isValid)}
            />
            <button type="submit" className="btn btn-primary">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SetNewPassword;

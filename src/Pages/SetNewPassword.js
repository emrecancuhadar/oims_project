import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import "../CSS/SetNewPassword.css";

function SetNewPassword() {
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
    setSuccess(true);
    setError("");
  };

  return (
    <div className="page">
      <div className="set-new-password-container">
        <img src={require("../assets/images/iyte_logo.png")} alt="IYTE Logo" />
        <h2>Set New Password</h2>
        {success ? (
          <div className="success-message">
            <p>Your password has been updated successfully!</p>
            <p>You will be directed to the Login Page.</p>
          </div>
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

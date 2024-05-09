import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/ResetPassword.module.css";
import axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    console.log("Password reset request for:", email);
    setSubmitted(true);
    setError("");

    const formData = new FormData();
    formData.append("email", email);

    axios
      .post("http://localhost:8081/company/resetPassword", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.page}>
      <div className={styles.resetPasswordContainer}>
        <img
          className={styles.logoImage}
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
        />
        <h2 style={{ textAlign: "center" }}>Reset Your Password</h2>
        <p>We will email you instructions to reset your password.</p>
        {submitted ? (
          <div>
            <p>
              A password reset link will be sent to {email} if it is associated
              with an account. Please check your inbox.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className={styles.inputField}
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className={styles.submitButton}>
              Send
            </button>
          </form>
        )}
        <p className={styles.para} onClick={() => navigate("/company/login")}>
          Back to Login Page
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;

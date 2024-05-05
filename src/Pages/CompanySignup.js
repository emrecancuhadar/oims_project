import React, { useState } from "react";
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    console.log("Signing up with:", company, email, password);
    navigate("/company/home");
  };

  return (
    <div className="pages">
      <div className="company-signup-container">
        <img
          className="iyte_logo"
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
        />
        <form onSubmit={handleSignup}>
          <label>Name of Company:</label>
          <input
            type="text"
            value={company}
            required
            onChange={(e) => setCompany(e.target.value)}
          />
          <label>E-mail:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            minLength={8}
            maxLength={28}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            value={passwordAgain}
            minLength={8}
            maxLength={28}
            required
            onChange={(e) => setPasswordAgain(e.target.value)}
          />
          <PasswordChecklist
            className="passwordcheck"
            rules={[
              "minLength",
              "specialChar",
              "number",
              "capital",
              "match",
              "",
            ]}
            minLength={8}
            value={password}
            valueAgain={passwordAgain}
            onChange={(isValid) => {}}
          />
          <button type="submit">Sign Up</button>
        </form>
        <p className="para" onClick={() => navigate("/company/login")}>
          Sign in now!
        </p>
      </div>
    </div>
  );
}

export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyLogin.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("Logging in with:", email, password);
    navigate("/company/home");
  };

  return (
    <div className="pages">
      <div className="company-login-container">
        <img
          className="iyte_logo"
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
        />
        <form onSubmit={handleLogin}>
          <label>
            Enter your E-Mail:
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Enter your password:
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <p className="para" onClick={() => navigate("/company/signup")}>
          Sign up now!
        </p>
        <p className="para" onClick={() => alert("Reset password logic")}>
          Forgot my password
        </p>
      </div>
    </div>
  );
}

export default Login;

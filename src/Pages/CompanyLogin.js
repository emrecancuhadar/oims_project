import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyLogin.css";
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
          console.log(data);
          loginUser({ id: data.id, name: data.companyName, email: data.email });
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
    <div className="pages">
      <div className="company-login-container">
        <img
          className="iyte_logo"
          src={require("../assets/images/iyte_logo.png")}
          alt="IYTE Logo"
        />
        <form onSubmit={handleLogin}>
          <label>
            E-mail:
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
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

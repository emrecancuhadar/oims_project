import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/CompanyLogin.module.css"; // Updated import
import { UserContext } from "../context/UserProvider";
import Popup from "../components/Popup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [wrongPopupOpen, wrongSetPopupOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/company/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        response.json().then((data) => {
          loginUser({
            id: data.id,
            name: data.companyName,
            email: data.email,
            registrationStatus: data.registrationStatus,
            role: "company",
          });
        });
        setPopupOpen(true);
        setTimeout(() => {
          navigate("/company/home");
      }, 3000);

      } else {
        wrongSetPopupOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  const SigninPopupContent = () => (
    <div className={styles.popupContent}>
      <p>Your credentials are correct.</p>
      <p>You will be directed to home page in 3 seconds.</p>
    </div>
  );

  const WrongPopupContent = () => (
    <div className={styles.popupContent}>
      <button className={styles.closeBtn} onClick={() => wrongSetPopupOpen(false)}>
          &times;
        </button>
      <p>The email or password you entered is incorrect.</p>
      <p>Check your credentials or sign up for an account.</p>
    </div>
  );
  

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
          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
        <p className={styles.para} onClick={() => navigate("/company/signup")}>
          Sign up now!
        </p>
        <p
          className={styles.para}
          onClick={() => navigate("/company/resetpassword")}
        >
          Forgot my password
        </p>
      </div>
      {popupOpen && (
            <Popup
              content={<SigninPopupContent />} 
              isOpen={popupOpen}
              setIsOpen={setPopupOpen}
            />
          )};
      {wrongPopupOpen && (
            <Popup
              content={<WrongPopupContent />} 
              isOpen={wrongPopupOpen}
              setIsOpen={wrongSetPopupOpen}
            />
          )}
    </div>
    
  );
}

export default Login;

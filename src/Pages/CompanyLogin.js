import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/CompanyLogin.module.css"; // Updated import
import Popup from "../components/Popup";
import { UserContext } from "../context/UserProvider";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(UserContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const [wrongPopupOpen, wrongSetPopupOpen] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/company/login`, {
          email,
          password,
        })
        .then((response) => {
          if (response.status == 200) {
            const data = response.data;
            loginUser({
              id: data.id,
              name: data.companyName,
              email: data.email,
              registrationStatus: data.registrationStatus,
              role: "company",
            });
            setPopupOpen(true);
            setTimeout(() => {
              navigate("/company/home");
            }, 1000);
          } else {
            const errorData = response.data;
            setError(errorData.error);
            wrongSetPopupOpen(true);
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  const SigninPopupContent = () => (
    <div className={styles.popupContent}>
      <p>Your credentials are correct.</p>
      <p>You will be directed to home page in 1 second.</p>
    </div>
  );

  const WrongPopupContent = ({ error }) => (
    <>
      <p style={{ margin: 0 }}>{error}</p>
    </>
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
              type="text"
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
      )}
      ;
      {wrongPopupOpen && (
        <Popup
          content={error}
          isOpen={wrongPopupOpen}
          setIsOpen={wrongSetPopupOpen}
        />
      )}
    </div>
  );
}

export default Login;

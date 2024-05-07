import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import styles from "./header.module.css";

function Header({ username }) {
  const navigate = useNavigate();
  const { logoutUser } = useContext(UserContext);

  const onLogout = () => {
    navigate("/");
    logoutUser();
  };

  return (
    <div className={styles.header}>
      <span className={styles.username}>{username}</span>
      <button className={styles.logoutBtn} onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

function Header({ username }) {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
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

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import Notification from "../Notification";
import styles from "./header.module.css";
import Popup from "../Popup";

function Header({ username }) {
  const navigate = useNavigate();
  const { logoutUser } = useContext(UserContext);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);

  const onLogout = () => {
    navigate("/");
    logoutUser();
  };

  const LogoutPopupContent = () => (
    <div className={styles.popupContent}>
    <h1>Are you sure you want to log out?</h1>
    <div className={styles.btns}>
      <button className={styles.popupBackBtn} onClick={() => setLogoutPopupOpen(false)}>Back</button>
      <button className={styles.popupLogoutBtn} onClick={onLogout}>Log out</button>
    </div>
  </div>
  )

  return (
    <div className={styles.header}>
      <span className={styles.username}>{username}</span>
      <Notification />
      <button className={styles.logoutBtn} onClick={() => setLogoutPopupOpen(true)}>
        Log out
      </button>
      {logoutPopupOpen && (
        <Popup
          content={<LogoutPopupContent />}
          isOpen={logoutPopupOpen}
          setIsOpen={setLogoutPopupOpen}
        />
      )}
    </div>
    
  );
}

export default Header;

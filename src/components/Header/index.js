import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import Notification from "../Notification";
import Popup from "../Popup";
import styles from "./header.module.css";

function UpdateProfileModal({
  user,
  updateProfile,
  updateProfileModalOpen,
  setUpdateProfileModalOpen,
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState("");
  const [updatedPopupOpen, setUpdatedPopupOpen] = useState(false);
  const [updateErrorPopupOpen, setUpdateErrorPopupOpen] = useState(false);

  const saveProfile = (event) => {
    event.preventDefault();
    updateProfile(name, email)
      .then((response) => {
        if (response.ok) {
          setUpdatedPopupOpen(true);
        } else if (response.status === 400) {
          setError(response.data); // Display specific error message from backend
          setUpdateErrorPopupOpen(true);
        } else {
          setError(response.data.error || "An unexpected error occurred");
          setUpdateErrorPopupOpen(true);
        }
      })
      .catch((error) => {
        setError(error.message);
        setUpdateErrorPopupOpen(true);
      });
  };

  return (
    <>
      <Modal
        open={updateProfileModalOpen}
        onClose={() => setUpdateProfileModalOpen(false)}
      >
        <form className={styles.modal} onSubmit={saveProfile}>
          <h1>Update Profile</h1>
          <div className={styles.inputContainer}>
            <label htmlFor="name" style={{ textAlign: "left" }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              size={25}
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer} style={{ marginTop: "10px" }}>
            <label htmlFor="email" style={{ textAlign: "left" }}>
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              size={25}
              maxLength={30}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles.saveBtn}
            onClick={saveProfile}
          >
            Save
          </button>
          {updatedPopupOpen && (
            <Popup
              content={"Profile updated successfully!"}
              isOpen={updatedPopupOpen}
              setIsOpen={setUpdatedPopupOpen}
            />
          )}
          {updateErrorPopupOpen && (
            <Popup
              content={error}
              isOpen={updateErrorPopupOpen}
              setIsOpen={setUpdateErrorPopupOpen}
            />
          )}
        </form>
      </Modal>
    </>
  );
}

function Header({ username }) {
  const navigate = useNavigate();
  const { user, logoutUser, updateProfile } = useContext(UserContext);
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);

  const onLogout = () => {
    navigate("/");
    logoutUser();
  };

  const LogoutPopupContent = () => (
    <div className={styles.popupContent}>
      <h1>Are you sure you want to log out?</h1>
      <div className={styles.btns}>
        <button
          className={styles.popupBackBtn}
          onClick={() => setLogoutPopupOpen(false)}
        >
          Back
        </button>
        <button className={styles.popupLogoutBtn} onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.header}>
      <span className={styles.username}>{username}</span>
      {user.role === "company" && (
        <button
          className={styles.updateBtn}
          onClick={() => setUpdateProfileModalOpen(true)}
        >
          <EditIcon style={{ color: "#757575" }} />
        </button>
      )}
      <Notification />
      <button
        className={styles.logoutBtn}
        onClick={() => setLogoutPopupOpen(true)}
      >
        Log out
      </button>
      {user.role === "company" && (
        <UpdateProfileModal
          user={user}
          updateProfile={updateProfile}
          updateProfileModalOpen={updateProfileModalOpen}
          setUpdateProfileModalOpen={setUpdateProfileModalOpen}
        />
      )}
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

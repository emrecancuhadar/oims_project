import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserProvider";
import Notification from "../Notification";
import Popup from "../Popup";
import styles from "./header.module.css";

function UpdateProfileModal({
  user,
  updateProfileModalOpen,
  setUpdateProfileModalOpen,
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [updatedPopupOpen, setUpdatedPopupOpen] = useState(false);

  const saveProfile = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/company/changeInformation/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => setUpdatedPopupOpen(true))
      .catch((error) => console.log(error));
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
        </form>
      </Modal>
    </>
  );
}

function Header({ username }) {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(UserContext);
  const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(true);
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
      <button
        className={styles.updateBtn}
        onClick={() => setUpdateProfileModalOpen(true)}
      >
        <EditIcon style={{ color: "#757575" }} />
      </button>
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

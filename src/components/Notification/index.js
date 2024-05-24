import CloseIcon from "@mui/icons-material/Close";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserProvider";
import styles from "./notification.module.css";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#9a0e20",
    color: "white",
  },
}));

function NotificationItem({ notification, onClose }) {
  console.log(notification);
  return (
    <div className={styles.notificationItem}>
      <div className={styles.notificationContent}>
        {notification.title && (
          <>
            <span style={{ fontWeight: "bold" }}>{notification.title}</span>
            <div className={styles.line}></div>
          </>
        )}
        <span>{notification.content}</span>
      </div>
      <button
        onClick={() => onClose(notification.id)}
        className={styles.removeBtn}
      >
        <CloseIcon style={{ marginLeft: "auto" }} />
      </button>
    </div>
  );
}

function Notification() {
  const { user } = useContext(UserContext);
  const [isOpen, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log("not", notifications);
  }, [notifications]);

  useEffect(() => {
    if (user) {
      let receiver = "";
      if (user.role === "student") {
        receiver = "iztech-user";
      } else {
        receiver = user.role;
      }

      axios
        .get(`${process.env.REACT_APP_API_URL}/feedback/${receiver}/${user.id}`)
        .then((response) => {
          const notificationData = response.data;
          setNotifications(
            notificationData.map(({ id, content }) => ({
              id,
              content,
            }))
          );
        })
        .catch((error) => console.log(error));

      if (user.role === "company") {
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/feedback/announcement/${user.id}`
          )
          .then((response) => {
            const notificationData = response.data;
            setNotifications(
              notificationData.map(
                ({ id, content, announcement: { title } }) => ({
                  id,
                  title,
                  content,
                })
              )
            );
          })
          .catch((error) => console.log(error));
      }
    }
  }, [user]);

  const onClose = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/feedback/${user.role}/hide/${id}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.notificationIcon}>
      <IconButton onClick={() => setOpen(!isOpen)}>
        <StyledBadge
          badgeContent={notifications.length}
          max={9}
          color="default"
        >
          <MailIcon />
        </StyledBadge>
      </IconButton>

      <div
        className={styles.notificationContainer}
        style={{ opacity: isOpen ? 1 : 0 }}
      >
        {notifications &&
          notifications.map((notification, index) => (
            <React.Fragment key={index}>
              <NotificationItem notification={notification} onClose={onClose} />
              {index !== notifications.length - 1 && <hr />}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}

export default Notification;

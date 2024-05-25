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
        <span
          style={{
            color: "#757575",
            fontSize: 10,
            marginTop: "10px",
            marginLeft: "auto",
          }}
        >
          {notification.time}
        </span>
      </div>
      <button
        onClick={() => onClose(notification.id, notification.title)}
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
    fetchNotifications();
  }, [user]);

  const fetchNotifications = () => {
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
          const notificationsList = notificationData.map(
            ({ id, content, feedbackDate }) => ({
              id,
              content,
              time: feedbackDate,
            })
          );

          if (user.role === "company") {
            axios
              .get(
                `${process.env.REACT_APP_API_URL}/feedback/announcement/${user.id}`
              )
              .then((response) => {
                const companyNotificationData = response.data;
                const companyNotifications = companyNotificationData.map(
                  ({ id, content, feedbackDate, announcement: { title } }) => ({
                    id,
                    title,
                    content,
                    time: feedbackDate,
                  })
                );
                setNotifications([
                  ...notificationsList,
                  ...companyNotifications,
                ]);
              })
              .catch((error) => console.log(error));
          } else {
            setNotifications(notificationsList);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const onClose = (id, isAnnouncement) => {
    let receiver = "";
    if (user.role === "student") {
      receiver = "iztech-user";
    } else {
      receiver = user.role;
    }

    if (isAnnouncement) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/feedback/announcement/hide/${id}`
        )
        .then((response) => {
          console.log(response);
          fetchNotifications();
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .put(`${process.env.REACT_APP_API_URL}/feedback/${receiver}/hide/${id}`)
        .then((response) => {
          console.log(response);
          fetchNotifications();
        })
        .catch((error) => console.log(error));
    }
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
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <React.Fragment key={index}>
              <NotificationItem notification={notification} onClose={onClose} />
              {index !== notifications.length - 1 && <hr />}
            </React.Fragment>
          ))
        ) : (
          <p style={{ margin: 0 }}>You have no new messages.</p>
        )}
      </div>
    </div>
  );
}

export default Notification;

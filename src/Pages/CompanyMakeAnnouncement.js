import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CSS/CompanyMakeAnnouncement.module.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";

function CompanyMakeAnnouncement() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [deadline, setDeadline] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const onSend = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("deadline", deadline);
    formData.append("companyId", user.id);

    axios.post("http://localhost:8081/announcements/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Announcement Created:", response.data);
      navigate("/company/my-announcements");
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      }
      console.error("Error uploading the announcement:", error);
    });
  };

  return (
    <div className={styles.companyMakeAnnouncement}>
      <CompanySidebar />
      <div className={styles.companyHomepage}>
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Header username={user.name} />
          </div>
          <div className={styles.announcementsPageContainer}>
            <h1 className={styles.pageTitle}>Make Announcement</h1>
            <div className={styles.announcementsContainer}>
              <div className={styles.inputGroup}>
                <span className={styles.inputGroupText}>Title</span>
                <input
                  type="text"
                  className={styles.formControl}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="deadline">Deadline:</label>
                <input
                  type="date"
                  className={styles.formControl}
                  name="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="file"
                  className={styles.formControl}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <button
                className={styles.sendBtn}
                type="button"
                onClick={onSend}
                disabled={!title || !file || !deadline}
              >
                Send Announcement Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMakeAnnouncement;

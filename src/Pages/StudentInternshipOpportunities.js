import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import InternshipOpportunity from "../components/InternshipOpportunity";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

// TODO pop-up a bir yüklenme ekranı eklenebilir.

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [annoucements, setAnnouncements] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  
  

  useEffect (() => {
    fetchStudentOpportunities();
  }, [])

  const fetchStudentOpportunities = () => {
    console.log('====================================');
    console.log(user.id);
    console.log('====================================');
    axios
      .get(`${process.env.REACT_APP_API_URL}/announcements/approved/${user.id}`)
      .then((response) => {
        const announcementsData = response.data;
        setAnnouncements(
          announcementsData.map(
            ({
              announcementId,
              title,
              deadline,
              company: { companyName, email },
              document: { content },
            }) => ({
              id: announcementId,
              companyName,
              title,
              email,
              deadline,
              content,
            }))
        );
      })
      .catch((error) => {
        console.error("Error fetching opportunities", error);
      });
  };

  const applyAnnouncement = (id) => {
    axios
        .post(
          `${process.env.REACT_APP_API_URL}/students/${user.id}/apply-announcement/${id}`
        )
        .then((response) => {
          setAnnouncements((prevAnnouncements) =>
            prevAnnouncements.filter((announcement) => announcement.id !== id)
          );
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    };
  

  return (
    <div className={styles.studentInternshipOpps}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.internships}>
          <div className={styles.titleContainer}>
            <h1>Internship Opportunities</h1>
          </div>
          <div className={styles.internshipsContainer}>
            {annoucements.map((announcement, index) => (
              <InternshipOpportunity
                key={index}  
                announcement={announcement}
                onApply={applyAnnouncement}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInternshipOpportunities;

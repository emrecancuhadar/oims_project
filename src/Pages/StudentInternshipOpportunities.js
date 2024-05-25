import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import ConstantPopup from "../components/ConstantPopup";
import Header from "../components/Header";
import InternshipOpportunity from "../components/InternshipOpportunity";
import Popup from "../components/Popup";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

  useEffect(() => {
    fetchStudentOpportunities();
  }, []);

  const fetchStudentOpportunities = () => {
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
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching opportunities", error);
      });
  };

  const applyAnnouncement = (id) => {
    setLoading(true); // Start loading state
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/students/${user.id}/apply-announcement/${id}`
      )
      .then((response) => {
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter((announcement) => announcement.id !== id)
        );
        console.log(response.data);
        // Ensure loading state is finished before showing confirmation popup
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const PopupContent = ({ announcement }) => {
    return (
      <div
        className={styles.popupContent}
        onClick={(event) => event.stopPropagation()}
      >
        <h1 style={{ fontSize: 18 }}>
          Are you sure you want to apply to {announcement.companyName}?
        </h1>
        <div className={styles.btns}>
          <button
            className={styles.popupCancelBtn}
            onClick={(event) => {
              event.stopPropagation();
              setPopupOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className={styles.popupApplyBtn}
            onClick={(event) => {
              event.stopPropagation();
              setPopupOpen(false);
              applyAnnouncement(announcement.id);
            }}
          >
            Apply
          </button>
        </div>
      </div>
    );
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
            {announcements.map((announcement, index) => (
              <React.Fragment key={announcement.id}>
                <InternshipOpportunity
                  announcement={announcement}
                  onApply={() => {
                    setCurrentAnnouncement(announcement);
                    setPopupOpen(true);
                  }}
                />
                {popupOpen && currentAnnouncement && (
                  <Popup
                    content={
                      <PopupContent announcement={currentAnnouncement} />
                    }
                    isOpen={popupOpen}
                    setIsOpen={setPopupOpen}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {loading && (
        <ConstantPopup
          content={"Filling the application letter..."}
          isOpen={loading}
        />
      )}
    </div>
  );
}

export default StudentInternshipOpportunities;

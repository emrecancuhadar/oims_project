import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import InternshipOpportunity from "../components/InternshipOpportunity";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";
import Popup from "../components/Popup";

// TODO pop-up a bir yüklenme ekranı eklenebilir.

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [opportunities, setOpportunities] = useState([]);
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
        const opportunitiesData = response.data;
        setOpportunities(
          opportunitiesData.map(
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
    setPopupOpen(false);
    setConfirmationPopupOpen(true);
    axios
        .post(
          `${process.env.REACT_APP_API_URL}/students/${user.id}/apply-announcement/${id}`
        )
        .then((response) => {
          
          console.log(response.data);
          setOpportunities((prevAnnouncements) => 
            prevAnnouncements.filter((opportunity) => opportunity.id !== id))
        })
        .catch((error) => console.log(error));
    };
  
    const PopupContent = (opportunity) => (
      <div
        className={styles.popupContent}
        onClick={(event) => event.stopPropagation()}
      >
        <h1>Are you sure you want to apply to {opportunity.companyName}?</h1>
        <div className={styles.btns}>
          <button className={styles.popupCancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.popupApplyBtn} 
          onClick={(event) => {
            event.stopPropagation();
            applyAnnouncement();
          }}>
            Apply
          </button>
        </div>
      </div>
    );

    const ConfirmationContent = (opportunity) => (
      <div
        className={styles.popupContent}
        onClick={(event) => event.stopPropagation()}
      >
        <h1>Applied to {opportunity.companyName}</h1>
        <button className={styles.popupCnfBtn} onClick={handleConfirmationClose}>
          Done
        </button>
      </div>
    );

    const handleCancel = (event) => {
      event.stopPropagation();
      setPopupOpen(false);
    };

    const handleConfirmationClose = () => {
      setConfirmationPopupOpen(false);
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
            {opportunities.map((opportunity) => (
              <InternshipOpportunity
                key={opportunity.id}  
                opportunity={opportunity}
                onApply={applyAnnouncement}
              />
            ))}
          </div>
        </div>
      </div>
      {popupOpen && (
          <Popup
            content={<PopupContent />}
            isOpen={popupOpen}
            setIsOpen={setPopupOpen}
          />
        )}
        {confirmationPopupOpen && (
          <Popup
            content={<ConfirmationContent />}
            isOpen={confirmationPopupOpen}
            setIsOpen={setConfirmationPopupOpen}
          />
        )}
    </div>
  );
}

export default StudentInternshipOpportunities;

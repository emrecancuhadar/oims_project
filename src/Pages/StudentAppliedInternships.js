import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentAppliedInternships.module.css";
import AppliedInternship from "../components/AppliedInternship";
import Header from "../components/Header";
import Popup from "../components/Popup";
import StatusFilterAccordion from "../components/StatusFilterAccordion";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

function StudentAppliedInternships() {
  const { user } = useContext(UserContext);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [internship, setInternship] = useState(null);
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  useEffect(() => {
    fetchAppliedInternships();
  }, []);

  const fetchAppliedInternships = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/students/${user.id}/applied-internships`
      )
      .then((response) => {
        setAppliedInternships(
          response.data.map((application) => ({
            id: application.announcement.announcementId,
            companyName: application.company
              ? application.company.companyName
              : application.announcement.company.companyName,
            position: application.announcement.title,
            companyEmail: application.company
              ? application.company.email
              : application.announcement.company.email,
            applicationDate: application.applicationDate,
            status: application.status,
            registrationStatus: application.internshipRegistration?.status,
          }))
        );
      });
  };

  const handleRegisterInitiate = (internship) => {
    setRegisterPopupOpen(true);
    setInternship(internship);
  };

  const handleRegisterConfirm = (event) => {
    event.stopPropagation();
    const formData = new FormData();
    formData.append("studentId", user.id);
    formData.append("announcementId", internship.id);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/internship-registration/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Registering to:", internship.companyName);
        fetchAppliedInternships();
        setRegisterPopupOpen(false);
        setConfirmationPopupOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCancelRegistration = (event) => {
    event.stopPropagation();
    setRegisterPopupOpen(false);
  };
  const handleConfirmationClose = (event) => {
    event.stopPropagation();
    setConfirmationPopupOpen(false);
  };

  const RegistrationConfirmationContent = () => (
    <div
      className={styles.popupContent}
      onClick={(event) => event.stopPropagation()}
    >
      <h1 style={{ fontSize: 18 }}>
        Are you sure you want to register to {internship.companyName}?
      </h1>
      <div className={styles.btns}>
        <button
          className={styles.popupCancelBtn}
          onClick={handleCancelRegistration}
        >
          Cancel
        </button>
        <button
          className={styles.popupApplyBtn}
          onClick={handleRegisterConfirm}
        >
          Register
        </button>
      </div>
    </div>
  );
  const RegistrationCompleteContent = () => (
    <div
      className={styles.popupContent}
      onClick={(event) => event.stopPropagation()}
    >
      <h1 style={{ fontSize: 18 }}>Registered to {internship.companyName}</h1>
      <button className={styles.popupCnfBtn} onClick={handleConfirmationClose}>
        Done
      </button>
    </div>
  );

  return (
    <div className={styles.appliedInternships}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.page}>
          <div className={styles.titleContainer}>
            <h1>Applied Internships</h1>
          </div>
          <StatusFilterAccordion
            data={appliedInternships}
            ItemComponent={({ item }) => (
              <AppliedInternship
                internship={item}
                handleRegisterInitiate={handleRegisterInitiate}
              />
            )}
          />
        </div>
      </div>
      {registerPopupOpen && (
        <Popup
          content={<RegistrationConfirmationContent />}
          isOpen={registerPopupOpen}
          setIsOpen={setRegisterPopupOpen}
        />
      )}
      {confirmationPopupOpen && (
        <Popup
          content={<RegistrationCompleteContent />}
          isOpen={confirmationPopupOpen}
          setIsOpen={setConfirmationPopupOpen}
        />
      )}
    </div>
  );
}
export default StudentAppliedInternships;

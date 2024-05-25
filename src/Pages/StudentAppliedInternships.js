import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentAppliedInternships.module.css";
import AppliedInternship from "../components/AppliedInternship";
import Header from "../components/Header";
import StatusFilterAccordion from "../components/StatusFilterAccordion";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

function StudentAppliedInternships() {
  const { user } = useContext(UserContext);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);

  useEffect(() => {
    fetchAppliedInternships();
  }, []);

  const fetchAppliedInternships = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/${user.id}/applied-internships`)
      .then((response) => {
        setAppliedInternships(response.data.map((application) => ({
          id: application.announcement.announcementId,
          companyName: application.company ? application.company.companyName : application.announcement.company.companyName,
          position: application.announcement.title,
          companyEmail: application.company ? application.company.email : application.announcement.company.email,
          applicationDate: application.applicationDate,
          status: application.status,
          registrationStatus: application.internshipRegistration?.status
        })));
      });
  };

  const handleRegisterInitiate = () => {
    setRegisterPopupOpen(true);
  };

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
                registerPopupOpen={registerPopupOpen}
                setRegisterPopupOpen={setRegisterPopupOpen}
                confirmationPopupOpen={confirmationPopupOpen}
                setConfirmationPopupOpen={setConfirmationPopupOpen}
                fetchAppliedInternships={fetchAppliedInternships}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
export default StudentAppliedInternships;
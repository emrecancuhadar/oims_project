import Modal from "@mui/material/Modal";
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

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleEmailModalOpen = () => setEmailModalOpen(true);
  const handleEmailModalClose = () => {
    setEmailModalOpen(false);
    setPopupOpen(false);
  };
  const handleEmailChange = (event) => setEmail(event.target.value);
  const sendEmail = (event) => {
    event.preventDefault();
    setPopupOpen(true);
    setEmail("");
  };

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
          response.data.map((application) => {
            return {
              id: application.applicationId,
              companyName: application.company
                ? application.company.companyName
                : application.announcement.company.companyName,
              position: application.announcement.title,
              status: application.status,
              companyEmail: application.company
                ? application.company.email
                : application.announcement.company.email,
              applicationDate: application.applicationDate,
              registrationStatus: application.internshipRegistration?.status,
            };
          })
        );
      });
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
          <Modal open={emailModalOpen} onClose={handleEmailModalClose}>
            <form onSubmit={sendEmail} className={styles.modal}>
              <h1>Enter the e-mail of the company</h1>
              <input
                type="email"
                placeholder="Enter company email"
                className={styles.emailInput}
                value={email}
                onChange={handleEmailChange}
                title="Please enter a valid email address."
                required
              />
              <button type="submit" className={styles.sendButton}>
                Send E-Mail
              </button>
              {popupOpen && (
                <Popup
                  content={"Application form is sent"}
                  isOpen={popupOpen}
                  setIsOpen={setPopupOpen}
                />
              )}
            </form>
          </Modal>
          <StatusFilterAccordion
            data={appliedInternships}
            ItemComponent={({ item }) => (
              <AppliedInternship
                internship={item}
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

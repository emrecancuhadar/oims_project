import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentAppliedInternships.module.css";
import AppliedInternship from "../components/AppliedInternship";
import Header from "../components/Header";
import Popup from "../components/Popup";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

function StudentAppliedInternships() {
  const { user } = useContext(UserContext);
  const [appliedInternships, setAppliedInternships] = useState([
    {
      id: 1,
      companyName: "Davon",
      content: "Backend Developer",
      status: "accepted",
      email: "davon@davon.com",
    },
    {
      id: 2,
      companyName: "Google",
      content: "Frontend Developer",
      status: "pending",
      email: "google@gmail.com",
    },
    {
      id: 3,
      companyName: "Microsoft",
      content: "SUBMARINER",
      status: "rejected",
      email: "microsoft@gmail.com",
    },
    {
      id: 4,
      companyName: "Abcd",
      content: "Cloud Engineer",
      status: "accepted",
      email: "abcd@gmail.com",
    },
  ]);

  const [visibleSections, setVisibleSections] = useState({
    accepted: true,
    pending: true,
    rejected: true,
  });

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

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
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
            };
          })
        );
      });
  }, []);

  return (
    <div className={styles.appliedInternships}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.page}>
          <div className={styles.titleContainer}>
            <h1>Applied Internships</h1>
            <button
              onClick={handleEmailModalOpen}
              className={styles.sendEmailButton}
            >
              Send Email
            </button>
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
          {["ACCEPTED", "PENDING", "REJECTED"].map((section) => (
            <div key={section}>
              <div className={styles.sectionHeader}>
                <button
                  onClick={() => toggleSection(section)}
                  className={styles.toggleButton}
                >
                  {visibleSections[section] ? "▼" : "►"}{" "}
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </div>
              {visibleSections[section] && (
                <div className={styles.appliedContainer}>
                  {appliedInternships
                    .filter((internship) => internship.status === section)
                    .map((internship) => (
                      <AppliedInternship
                        key={internship.id}
                        internship={internship}
                      />
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentAppliedInternships;

import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import InternshipOpportunity from "../components/InternshipOpportunity";
import Popup from "../components/Popup";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

//TODO pop-up a bir yüklenme ekranı eklenebilir.

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPopupOpen(false);
  };
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("companyEmail", email);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/students/${user.id}/apply-company`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setPopupOpen(true);
        setEmail("");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/announcements/approved`)
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
            })
          )
        );
      });
  }, []);

  return (
    <div className={styles.studentInternshipOpps}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.internships}>
          <div className={styles.titleContainer}>
            <h1>Internship Opportunities</h1>
            <button onClick={handleOpen}>Send Email</button>
          </div>
          <div className={styles.internshipsContainer}>
            {opportunities.map((opportunity) => (
              <InternshipOpportunity
                key={opportunity.id}
                opportunity={opportunity}
                onApply={setSelectedOpportunity}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit} className={styles.modal}>
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
              content={"Application letter is sent"}
              isOpen={popupOpen}
              setIsOpen={setPopupOpen}
            />
          )}
        </form>
      </Modal>
    </div>
  );
}

export default StudentInternshipOpportunities;

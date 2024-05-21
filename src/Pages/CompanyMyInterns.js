import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/CompanyMyInterns.module.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import InternCard from "../components/InternCard";
import Popup from "../components/Popup";
import { UserContext } from "../context/UserProvider";

function CompanyMyInterns() {
  const { user } = useContext(UserContext);
  const [interns, setInterns] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPopupOpen(false);
    setErrorPopupOpen(false);
  };

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/company/intern/${email}/${user.id}`
      )
      .then((response) => {
        setPopupOpen(true);
        setEmail("");
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data || "An unexpected error occurred."
        );
        setErrorPopupOpen(true);
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/company/interns/${user.id}`)
      .then((response) => {
        const data = response.data;
        console.log("interns", data);
        setInterns(
          data.map(
            ({
              id,
              fullName,
              email,
              contactNumber,
              company: { id: companyId },
            }) => ({
              id,
              name: fullName,
              mail: email,
              phoneNumber: contactNumber,
              company: companyId,
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching interns:", error);
      });
  }, [user.id]);

  return (
    <div className={styles.CompanyMyInterns}>
      <CompanySidebar />
      <div className={styles.companyMyInternshipsMainContent}>
        <Header username={user.name} />
        <div className={styles.homepage}>
          <div className={styles.titleContainer}>
            <h1>My Interns</h1>
          </div>
          <div className={styles.addInternContainer}>
            <button className={styles.addInternBtn} onClick={handleOpen}>
              Add Intern
            </button>
          </div>
          <div className={styles.homepageContainer}>
            {interns.map((student, index) => (
              <InternCard key={index} student={student} />
            ))}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit} className={styles.modal}>
          <h1>Enter the e-mail of the intern</h1>
          <input
            type="text"
            placeholder="Enter intern email"
            className={styles.emailInput}
            value={email}
            onChange={handleEmailChange}
            title="Please enter a valid email address."
            required
          />
          <button type="submit" className={styles.sendButton}>
            Add Intern
          </button>
          {popupOpen && (
            <Popup
              content={"Intern added successfully"}
              isOpen={popupOpen}
              setIsOpen={setPopupOpen}
            />
          )}
          {errorPopupOpen && (
            <Popup
              content={errorMessage}
              isOpen={errorPopupOpen}
              setIsOpen={setErrorPopupOpen}
            />
          )}
        </form>
      </Modal>
    </div>
  );
}

export default CompanyMyInterns;

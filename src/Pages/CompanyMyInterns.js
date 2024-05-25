// Main page
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/CompanyMyInterns.module.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import InternCard from "../components/InternCard";
import StatusFilterAccordion from "../components/StatusFilterAccordion";
import { UserContext } from "../context/UserProvider";

function CompanyMyInterns() {
  const { user } = useContext(UserContext);
  const [interns, setInterns] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("fetch interns");
    fetchInterns();
  }, []);

  const fetchInterns = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/company/interns/${user.id}`)
      .then((response) => {
        const data = response.data;
        setInterns(
          data.map(
            ({ internshipRegistrationId, student: { id, fullName, email, contactNumber }, status }) => ({
              id,
              name: fullName,
              mail: email,
              phoneNumber: contactNumber,
              status,
              internshipRegistrationId
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching interns:", error);
      });
  };

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
        fetchInterns(); // Refetch the intern list after adding a new intern
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data || "An unexpected error occurred."
        );
        setErrorPopupOpen(true);
      });
  };

  return (
    <div className={styles.CompanyMyInterns}>
      <CompanySidebar />
      <div className={styles.companyMyInternshipsMainContent}>
        <Header username={user.name} />
        <div className={styles.homepage}>
          <div className={styles.titleContainer}>
            <h1>My Interns</h1>
          </div>
          <StatusFilterAccordion
            data={interns}
            ItemComponent={({ item }) => <InternCard student={item} internshipRegistrationId={item.internshipRegistrationId} />}
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyMyInterns;

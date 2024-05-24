import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/CompanyMyApplicants.module.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";
import Applicant from "../components/Applicant";
import Popup from "../components/Popup";

function CompanyMyApplicants() {
    const { user } = useContext(UserContext);
    const [applicants, setMyApplicants] = useState([]);
    const [isApprovePopupOpen, setApprovePopupOpen] = useState(false);
    const [isDisapprovePopupOpen, setDisapprovePopupOpen] = useState(false);

    useEffect(() => {
      fetchPendingApplicants();
    }, []);
  
    const fetchPendingApplicants = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/company/${user.id}/applied-internships`)
        .then((response) => {
          const data = response.data;
          setMyApplicants(
            data.map(
              ({ applicationId, applicationLetter: {content}, student: {fullName, email, contactNumber} }) => ({
                id: applicationId,
                name : fullName,
                mail : email,
                phoneNumber : contactNumber,
                applicationLetter: content,
              })
            )
          );
        })
        .catch((error) => {
          console.error("Error fetching announcement requests:", error);
        });
    };

    const approveApplicant = (id) => {
        axios
          .put(`${process.env.REACT_APP_API_URL}/company/applicant/${id}/approve`)
          .then((response) => {
            setApprovePopupOpen(true);
            // Update the state to remove the approved company request
            setMyApplicants((prevApplications) =>
              prevApplications.filter((application) => application.id !== id)
            );
          })
          .catch((error) => console.log(error));
      };
    
      const disapproveApplicant = (id) => {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/company/applicant/${id}/disapprove`
          )
          .then((response) => {
            setDisapprovePopupOpen(true);
            // Update the state to remove the disapproved company request
            setMyApplicants((prevApplications) =>
              prevApplications.filter((application) => application.id !== id)
            );
          })
          .catch((error) => console.log(error));
      };

      
  return (
    <div className={styles.CompanyMyApplicants}>
    <CompanySidebar />
    <div className={styles.companyMyApplicantsMainContent}>
      <Header username={user.name} />
      <div className={styles.homepage}>
        <div className={styles.titleContainer}>
          <h1>My Applicants</h1>
          </div>
        <div className={styles.myApplicantsContainer}>
            {applicants.map((application, index) => (
              <Applicant
                key={index}
                applicant={application}
                onApprove={approveApplicant}
                onDisapprove={disapproveApplicant}
              />
            ))}
          </div>
          {isApprovePopupOpen && (
        <Popup
          content={"Applicant is approved"}
          isOpen={isApprovePopupOpen}
          setIsOpen={setApprovePopupOpen}
        />
      )}
      {isDisapprovePopupOpen && (
        <Popup
          content={"Applicant is disapproved"}
          isOpen={isDisapprovePopupOpen}
          setIsOpen={setDisapprovePopupOpen}
        />
      )}
        </div>
        </div>
      </div>
  )
}

export default CompanyMyApplicants
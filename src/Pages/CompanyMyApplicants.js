import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/CompanyMyApplicants.module.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import InternCard from "../components/InternCard";
import Popup from "../components/Popup";
import { UserContext } from "../context/UserProvider";
import Applicant from "../components/Applicant";

function CompanyMyApplicants() {
    const { user } = useContext(UserContext);
    const [applicants, setMyApplicants] = useState([
        {
            id: 1,
            name: 'Çağan',
            email: 'caganozsir@std.iyte.edu.tr',
            contact: '0555 555 55 55',
        },
        {
            id: 2,
            name: 'Çağan',
            email: 'caganozsir@std.iyte.edu.tr',
            contact: '0555 555 55 55',
        },
        {
            id: 3,
            name: 'Çağan',
            email: 'caganozsir@std.iyte.edu.tr',
            contact: '0555 555 55 55',
        },
        {
            id: 4,
            name: 'Çağan',
            email: 'caganozsir@std.iyte.edu.tr',
            contact: '0555 555 55 55',
        },
        {
            id: 3,
            name: 'Çağan',
            email: 'caganozsir@std.iyte.edu.tr',
            contact: '0555 555 55 55',
        },
        {
            id: 3,
            name: 'Çağan',
            email: 'caganozsir@std.iyte.edu.tr',
            contact: '0555 555 55 55',
        },
    ]);

    const approveApplicant = (id) => {
        /*axios
          .put(`${process.env.REACT_APP_API_URL}/systemadmin/company/${id}/approve`)
          .then((response) => {
            // Update the state to remove the approved company request
            setCompanyRequests((prevRequests) =>
              prevRequests.filter((request) => request.id !== id)
            );
          })
          .catch((error) => console.log(error));*/
      };
    
      const disapproveApplicant = (id) => {
        /*axios
          .put(
            `${process.env.REACT_APP_API_URL}/systemadmin/company/${id}/disapprove`
          )
          .then((response) => {
            // Update the state to remove the disapproved company request
            setCompanyRequests((prevRequests) =>
              prevRequests.filter((request) => request.id !== id)
            );
          })
          .catch((error) => console.log(error));*/
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
            {applicants.map((applicant, index) => (
              <Applicant
                key={index}
                applicant={applicant}
                onApprove={approveApplicant}
                onDisapprove={disapproveApplicant}
              />
            ))}
          </div>

        </div>
        </div>
      </div>
  )
}

export default CompanyMyApplicants
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/AdminRegistrationRequests.module.css";
import CompanyRequest from "../components/CompanyRequest";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";
import { UserContext } from "../context/UserProvider";

function AdminRegistrationRequests() {
  const [companyRequests, setCompanyRequests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchCompanyRequests();
  }, []);

  const fetchCompanyRequests = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/company/list`)
      .then((response) => {
        const data = response.data;
        setCompanyRequests(
          data.map(({ id, companyName, email }) => ({ id, companyName, email }))
        );
      })
      .catch((error) => {
        console.error("Error fetching company requests:", error);
      });
  };

  const approveCompany = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/systemadmin/company/${id}/approve`)
      .then((response) => {
        // Update the state to remove the approved company request
        setCompanyRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  const disapproveCompany = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/systemadmin/company/${id}/disapprove`
      )
      .then((response) => {
        // Update the state to remove the disapproved company request
        setCompanyRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  const banCompany = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/systemadmin/company/${id}/ban`)
      .then((response) => {
        // Update the state to remove the banned company request
        setCompanyRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error banning company:", error);
      });
  };

  return (
    <div className={styles.adminCompanyRequest}>
      <SystemAdminSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.registrations}>
          <h1 className={styles.pageTitle}>Company Registration Requests</h1>
          <div className={styles.registrationRequestsContainer}>
            {companyRequests.map((companyRequest, index) => (
              <CompanyRequest
                key={index}
                companyRequest={companyRequest}
                onApprove={approveCompany}
                onDisapprove={disapproveCompany}
                onBan={banCompany}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistrationRequests;

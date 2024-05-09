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
    axios.get(`http://localhost:8081/company/list`).then((response) => {
      const data = response.data;
      setCompanyRequests(data.map(({ id, companyName, email }) => ({ id, companyName, email })));
    });
  }, []);

  return (
    <div className={styles.adminCompanyRequest}>
      <SystemAdminSidebar />
      <div className={styles.mainContent}>
          <Header username={user.name} />
        <div className={styles.registrations}>
          <h1 className={styles.pageTitle}>Company Registration Requests</h1>
          <div className={styles.registrationRequestsContainer}>
            {companyRequests.map((companyRequest, index) => (
              <CompanyRequest key={index} companyRequest={companyRequest} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistrationRequests;

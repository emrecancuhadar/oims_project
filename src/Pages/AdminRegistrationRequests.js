import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../CSS/AdminRegistrationRequests.css";
import CompanyRequest from "../components/CompanyRequest";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";
import { UserContext } from "../context/UserProvider";

function AdminRegistrationRequests() {
  const [companyRequests, setCompanyRequests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("http://localhost:8081/company/list").then((response) => {
      const data = response.data;
      setCompanyRequests(
        data.map(({ id, companyName, email }) => ({
          id,
          companyName,
          email,
        }))
      );
    });
  }, []);
  return (
    <div className="admin-companyRequest">
      <SystemAdminSidebar />
      <div className="main-content">
        <div className="header d-flex align-items-center">
          <Header username={user.name} />
        </div>
        <div className="announcements align-items-center">
          <h1>Company Registration Requests</h1>
          <div className="announcement-requests-container">
            {companyRequests.map((companyRequest, index) => (
              <div key={index}>
                <CompanyRequest companyRequest={companyRequest} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegistrationRequests;

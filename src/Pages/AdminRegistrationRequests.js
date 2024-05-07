import axios from "axios";
import React, { useEffect, useState } from "react";
import "../CSS/AdminRegistrationRequests.css"
import { useNavigate } from "react-router-dom";
import SystemAdminSidebar from '../components/SystemAdminSidebar';
import Header from "../components/Header";
import CompanyRequest from '../components/CompanyRequest';

function AdminRegistrationRequests() {
const [companyRequests, setCompanyRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/company/list").then((response) => {
      const data = response.data;
      setCompanyRequests(
        data.map(({ companyName }) => ({
          companyName
        }))
      );
    });
  }, []);
    return (
        <div className="admin-companyRequest">
            <SystemAdminSidebar />
            <div className="main-content">
                <div className="header d-flex align-items-center">
                <Header username={"System Admin"} />
                </div>
                <div className="announcements align-items-center">
                    <h1>Company Registration Requests</h1>
                    <div className="announcement-requests-container">
                        {companyRequests.map((companyRequest, index) => (
                        <div key={index}>
                            <CompanyRequest
                             companyRequest={companyRequest}
                        />
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRegistrationRequests;

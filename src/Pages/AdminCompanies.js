import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/AdminCompanies.module.css";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";
import { UserContext } from "../context/UserProvider";
import Popup from "../components/Popup";
import ApprovedCompany from "../components/ApprovedCompany";

function AdminCompanies() {
    const [approvedCompanies, setApprovedCompanies] = useState([
        {
            companyId: 1,
            companyName: 'CompanyName',
            email: 'companymail@gmail.com'
        }
    ]);
    const { user } = useContext(UserContext);
    const [banPopupOpen, setBanPopupOpen] = useState(false);

    useEffect(() => {
        fetchApprovedCompanies();
      }, []);
    
      const fetchApprovedCompanies= () => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/company/approvedList`)
          .then((response) => {
            const data = response.data;
            setApprovedCompanies(
              data.map(
                ({ id, email, companyName }) => ({
                  companyId: id,
                  companyName,
                  email,
                })
              )
            );
          })
          .catch((error) => {
            console.error("Error fetching companies:", error);
          });
      };

      const banCompany = (companyId) => {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/systemadmin/company/${companyId}/ban`
          )
          .then((response) => {
            setBanPopupOpen(true);
            // Optionally, you could also remove announcements by the banned company
            setApprovedCompanies((prevApprovedCompanies) =>
                prevApprovedCompanies.filter((companyId) => companyId !== companyId)
            );
          })
          .catch((error) => console.log(error));
      };
    


  return (
    <div className={styles.adminCompanies}>
      <SystemAdminSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.companies}>
          <h1 className={styles.pageTitle}>Companies</h1>
          <div className={styles.companiesContainer}>
            {approvedCompanies.map((company, index) => (
              <ApprovedCompany
                key={index}
                approvedCompany={company}
                onBan={banCompany}
              />
            ))}
          </div>
          </div>
        </div>
        {banPopupOpen && (
          <Popup
            content={"Company is banned"}
            isOpen={banPopupOpen}
            setIsOpen={setBanPopupOpen}
          />
        )}
      </div>
  )
}

export default AdminCompanies
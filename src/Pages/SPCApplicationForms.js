import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/SPCApplicationForms.module.css";
import ApplicationFormRequest from "../components/ApplicationFormRequest";
import Header from "../components/Header";
import SPCSidebar from "../components/SPCSideBar";
import { UserContext } from "../context/UserProvider";

function SPCApplicationForms() {
  const [applicationFormRequests, setApplicationFormRequests] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/company/list`)
      .then((response) => {
        const data = response.data;
        setApplicationFormRequests(
          data.map(({ id, studentName, email }) => ({ id, studentName, email }))
        );
      });
  }, []);

  return (
    <div className={styles.spcApplicationFormRequest}>
      <SPCSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.applicationForms}>
          <h1 className={styles.pageTitle}>
            Summer Practice Application Forms
          </h1>
          <div className={styles.applicationFormsContainer}>
            {applicationFormRequests.map((applicationFormRequest, index) => (
              <ApplicationFormRequest
                key={index}
                applicationFormRequest={applicationFormRequest}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SPCApplicationForms;

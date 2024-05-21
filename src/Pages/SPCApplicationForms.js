import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/SPCApplicationForms.module.css";
import ApplicationFormRequest from "../components/ApplicationFormRequest";
import Header from "../components/Header";
import SPCSidebar from "../components/SPCSideBar";
import { UserContext } from "../context/UserProvider";

function SPCApplicationForms() {
  const [applicationFormRequests, setApplicationFormRequests] = useState([
    {
      id :1,
      owner: 'Çağan',
    },
    {
      id :2,
      owner: 'Çağan',
    },
    {
      id :3,
      owner: 'Çağan',
    }
  ]);
  const { user } = useContext(UserContext);

  /*useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/documents/applicationFormList`)
      .then((response) => {
        const data = response.data;
        setApplicationFormRequests(
          data.map(({ iztechUser: {id: studentId, name: studentName, }
           }) => ({ id, 
            studentName,
             email }))
        );
      });
  }, []);*/

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
            {applicationFormRequests.map((applicationFormRequest, id) => (
              <ApplicationFormRequest
                key={id}
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

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/CompanyMyInterns.module.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import InternCard from "../components/InternCard";
import { UserContext } from "../context/UserProvider";

function CompanyMyInterns() {
  const { user } = useContext(UserContext);
  const [interns, setInterns] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/company/interns/${user.id}`)
      .then((response) => {
        const data = response.data;
        console.log("interns", data);
        setInterns(
          data.map(
            ({
              id,
              fullName,
              email,
              contactNumber,
              company: { id: companyId },
            }) => ({
              id,
              name: fullName,
              mail: email,
              phoneNumber: contactNumber,
              company: companyId,
            })
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching interns:", error);
      });
  }, [user.id]);

  return (
    <div className={styles.CompanyMyInterns}>
      <CompanySidebar />
      <div className={styles.companyMyInternshipsMainContent}>
        <Header username={user.name} />
        <div className={styles.homepage}>
          <div className={styles.titleContainer}>
            <h1>My Interns</h1>
          </div>
          <div className={styles.addInternContainer}>
            <button className={styles.addInternBtn}>Add Intern</button>
          </div>
          <div className={styles.homepageContainer}>
            {interns.map((student, index) => (
              <InternCard key={index} student={student} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMyInterns;

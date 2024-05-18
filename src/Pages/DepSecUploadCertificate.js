import React, { useContext } from "react";
import DepSecSidebar from "../components/DepSecSidebar";
import styles from "../CSS/DepSecUploadCertificate.module.css";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";

function DepSecUploadCertificate() {
  const { user } = useContext(UserContext);
  return (
    <div className={styles.depSecUploadCertificate}>
      <DepSecSidebar />
      <div className={styles.uploadCertificateMainContent}>
        <Header username={user.name} />
        <div className={styles.homepage}>
          <div className={styles.titleContainer}>
            <h1>Upload Certificate</h1>
          </div>
          <div className={styles.homepageContainer}></div>
        </div>
      </div>
    </div>
  );
}

export default DepSecUploadCertificate;

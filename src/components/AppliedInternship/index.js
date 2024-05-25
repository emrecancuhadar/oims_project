import React from "react";
import styles from "./applied-internship.module.css";

function AppliedInternship({ internship, handleRegisterInitiate }) {
  return (
    <div className={styles.card} onClick={() => {}}>
      <div className={styles.content}>
        <h2>{internship.companyName}</h2>
        <div>
          <p>
            <strong>Position:</strong> {internship.position}
          </p>
          <p>
            <strong>E-mail:</strong> {internship.companyEmail}
          </p>
          <p>
            <strong>Application Date:</strong> {internship.applicationDate}
          </p>
        </div>

        {internship.status === "ACCEPTED" &&
          (internship.registrationStatus === "ACCEPTED" ? (
            <p className={styles.acceptedApplicationStatus}>Registered</p>
          ) : internship.registrationStatus === "REJECTED" ? (
            <p className={styles.acceptedApplicationStatus}>Rejected</p>
          ) : (
            <button
              onClick={() => handleRegisterInitiate(internship)}
              className={styles.registerBtn}
            >
              Register
            </button>
          ))}
      </div>
    </div>
  );
}
export default AppliedInternship;

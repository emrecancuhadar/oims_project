import React, { useContext } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

const internships = [
  { id: 1, title: "Internship 1" },
  { id: 2, title: "Internship 2" },
  { id: 3, title: "Internship 3" },
];

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);

  const handleActionClick = (action, id) => {
    alert(`${action} clicked for internship ${id}`);
  };

  const handleContentClick = () => {
    alert("Content Clicked!");
  };

  return (
    <div className={styles.studentInternshipOpps}>
      <StudentSidebar />
      <div className={styles.mainContent}>
          <Header username={user.name} />
        <div className={styles.internships}>
          <div className={styles.titleContainer}>
            <h1>Internship Opportunities</h1>
          </div>
          <div className={styles.internshipsContainer}>
            {internships.map((internship) => (
              <div key={internship.id} className={styles.card}>
                <h5
                  className={styles.cardTitle}
                  onClick={handleContentClick}
                >
                  {internship.title}
                </h5>
                <button
                  className={styles.actionButton}
                  onClick={() => handleActionClick("Apply", internship.id)}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentInternshipOpportunities;

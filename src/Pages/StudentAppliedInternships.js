import React, { useContext, useState } from "react";
import StudentSidebar from '../components/StudentSidebar';
import Header from '../components/Header';
import styles from '../CSS/StudentAppliedInternships.module.css';
import { UserContext } from '../context/UserProvider';
import AppliedInternship from '../components/AppliedInternship';

function StudentAppliedInternships() {
  const { user } = useContext(UserContext);
  const [appliedInternships, setAppliedInternship] = useState([
    {id: 1, title: 'Internship 1', content: 'Backend Developer', status: 'accepted'},
    {id: 2, title: 'Internship 2', content: 'Frontend Developer', status: 'pending'},
    {id: 3, title: 'Internship 3', content: 'SUBMARINER', status: 'rejected'},
    {id: 4, title: 'Internship 4', content: 'Arabada bulututum yok ama kızlar', status: 'accepted'},
  ]);

  const [visibleSections, setVisibleSections] = useState({
    accepted: true,
    pending: true,
    rejected: true
  });

  const toggleSection = (section) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={styles.appliedInternships}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.page}>
          <div className={styles.titleContainer}>
            <h1>Applied Internships</h1>
          </div>
          {['accepted', 'pending', 'rejected'].map(section => (
            <div key={section}>
              <div className={styles.sectionHeader}>
                <button onClick={() => toggleSection(section)} className={styles.toggleButton}>
                  {visibleSections[section] ? '▼' : '►'} {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </div>
              {visibleSections[section] && (
                <div className={styles.appliedContainer}>
                  {appliedInternships.filter(internship => internship.status === section).map(internship => (
                    <AppliedInternship key={internship.id} internship={internship} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentAppliedInternships;

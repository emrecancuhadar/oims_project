import React, { useContext, useState } from "react";
import styles from "../CSS/StudentMyDocuments.module.css";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StudentMyDocuments() {
  const { user } = useContext(UserContext);
  const [documents, setDocuments] = useState([
    {id: 1, title: user.name + ' Application Form'},
    {id: 2, title: user.name + ' Application Letter'},
    {id: 3, title: user.name + ' Employment Certificate'},
  ]);

  const formatKey = (key) => {
    return key.toLowerCase().replace(" ", "");
  }

  const [visibleSections, setVisibleSections] = useState({
    applicationletter: true,
    applicationform: true,
    employmentcertificate: true
  });

  const toggleSection = (section) => {
    setVisibleSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleContentClick = () => {
    alert("Content Clicked!");
  }

  const handleDownloadButton = (event) => {
    event.stopPropagation(); 
    alert("Implement download logic here.");
  }

  return (
    <div className={styles.myDocuments}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div>
          <div className={styles.titleContainer}>
            <h1>My Documents</h1>
          </div>
          {['Application Letter', 'Application Form', 'Employment Certificate'].map(section => (
            <div key={section}>
              <div className={styles.sectionHeader}>
                <button onClick={() => toggleSection(formatKey(section))} className={styles.toggleButton}>
                  {visibleSections[formatKey(section)] ? '▼' : '►'} {section}
                </button>
              </div>
              {visibleSections[formatKey(section)] && (
                <div className={styles.documentsContainer}>
                  {documents.filter(doc => doc.title.includes(section)).map(doc => (
                    <div key={doc.id} className={styles.documents} onClick={handleContentClick}>
                      {doc.title}
                      <FontAwesomeIcon
                        icon={faDownload}
                        color="black"
                        style={{ marginLeft: '5px' }}
                        size="2x"
                        onClick={handleDownloadButton}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
    </div>
  </div>
  )
}

export default StudentMyDocuments;

import React, { useContext, useState } from "react";
import styles from '../CSS/StudentAppliedInternships.module.css';
import Modal from "@mui/material/Modal";
import Popup from "../components/Popup";
import StudentSidebar from '../components/StudentSidebar';
import Header from '../components/Header';
import AppliedInternship from '../components/AppliedInternship';
import { UserContext } from '../context/UserProvider';

function StudentAppliedInternships() {
  const { user } = useContext(UserContext);
  const [appliedInternships, setAppliedInternship] = useState([
    {id: 1, companyName: 'Davon', content: 'Backend Developer', status: 'accepted'},
    {id: 2, companyName: 'Google', content: 'Frontend Developer', status: 'pending'},
    {id: 3, companyName: 'Microsoft', content: 'SUBMARINER', status: 'rejected'},
    {id: 4, companyName: 'abcd', content: 'Cloud Engineer', status: 'accepted'},
  ]);

  const [visibleSections, setVisibleSections] = useState({
    accepted: true,
    pending: true,
    rejected: true
  });

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleEmailModalOpen = () => setEmailModalOpen(true);
  const handleEmailModalClose = () => {
    setEmailModalOpen(false); 
    setPopupOpen(false)
  }
  const handleEmailChange = (event) => setEmail(event.target.value);
  const sendEmail = (event) => {
    event.preventDefault();  
    setPopupOpen(true);     
    setEmail("");        
  };

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
            <button onClick={handleEmailModalOpen} className={styles.sendEmailButton}>Send Email</button>
          </div>
          <Modal open={emailModalOpen} onClose={handleEmailModalClose}>
        <form onSubmit={sendEmail} className={styles.modal}>
          <h1>Enter the e-mail of the company</h1>
          <input 
            type="email" 
            placeholder="Enter company email" 
            className={styles.emailInput}
            value={email}
            onChange={handleEmailChange}
            title="Please enter a valid email address."
            required
          />
          <button type="submit" className={styles.sendButton}>
            Send E-Mail
          </button>
          {popupOpen && <Popup content={"Application form is sent"} isOpen={popupOpen} setIsOpen={setPopupOpen}/>
          }
        </form>
      </Modal>
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

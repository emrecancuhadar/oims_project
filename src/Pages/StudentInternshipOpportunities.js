import React, { useContext, useState } from "react";
import styles from "../CSS/StudentInternshipOpportunities.module.css";
import Header from "../components/Header";
import StudentSidebar from "../components/StudentSidebar";
import InternshipOpportunity from "../components/InternshipOpportunity";
import Modal from "@mui/material/Modal";
import Popup from '../components/Popup';
import { UserContext } from "../context/UserProvider";

function StudentInternshipOpportunities() {
  const { user } = useContext(UserContext);
  const [opportunities, setOpportunities] = useState([
    {id: 1, companyName: 'Davon', content: 'Bekirin yerine adam', email: 'davon@davon.com'},
    {id: 2, companyName: 'Research Ecosystems', content: 'Köle', email: 'tugkantuglular@iyte.edu.tr'},
    {id: 3, companyName: 'Google Inc.', content: 'Backend Developer', email: 'google@gmail.com'},
    {id: 4, companyName: 'Microsoft', content: 'Frontend Developer', email: 'microsoft@gmail.com'},
    {id: 5, companyName: 'Karacasu Pide', content: 'Servis Elemanı', email: 'karacasu@gmail.com'},
    {id: 6, companyName: 'Çiçek Kafe', content: 'Güzel kız', email: 'hasanabi@hotmail.com'},
    {id: 7, companyName: 'Gülbahçe Migros', content: 'Pizza elemanı', email: 'migros@gmail.com'},
  ]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false); 
    setPopupOpen(false);
  }
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();  
    setPopupOpen(true);     
    setEmail("");            
  };

  return (
    <div className={styles.studentInternshipOpps}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.internships}>
          <div className={styles.titleContainer}>
            <h1>Internship Opportunities</h1>
            <button onClick={handleOpen}>Send Email</button>
          </div>
          <div className={styles.internshipsContainer}>
            {opportunities.map((opportunity) => (
              <InternshipOpportunity key={opportunity.id} opportunity={opportunity} onApply={setSelectedOpportunity}/>
            ))}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit} className={styles.modal}>
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
          {popupOpen && <Popup content={"Application letter is sent"} isOpen={popupOpen} setIsOpen={setPopupOpen}/>
          }
        </form>
      </Modal>
    </div>
  );
}

export default StudentInternshipOpportunities;

import React from 'react';
import "../CSS/AdminRegistrationRequests.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import SystemAdminSidebar from '../components/SystemAdminSidebar';
import Header from "../components/Header";

const announcements = [
    { id: 1, title: "Company 1"},
    { id: 2, title: "Company 2"},
    { id: 3, title: "Company 3"},
];

function AdminRegistrationRequests() {
    const navigate = useNavigate();

    const handleActionClick = (action, id) => {
        alert(`${action} clicked for announcement ${id}`);
    };

    const handleContentClick = () => {
        // Placeholder for opening PDF
        alert('Content Clicked!');
    };

    return (
        <div className="admin-companyRequest">
            <SystemAdminSidebar />
            <div className="main-content">
                <div className="header d-flex align-items-center">
                <Header username={"System Admin"} />
                </div>
                <div className="announcements align-items-center">
                    <h1>Announcement Requests</h1>
                    <div className="row">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="col-sm-6 col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="announcement-details d-flex">
                                            <h5 className="card-title">{announcement.title}</h5>
                                        </div>
                                        <div className="btn-group">
                                                <button onClick={() => handleActionClick('Feedback', announcement.id)} className="btn btn-primary mr-1">Feedback</button>
                                                <button onClick={() => handleActionClick('Ban', announcement.id)} className="btn btn-danger">Ban</button>
                                            </div>
                                    </div>
                                    <div className="announcement-text">
                                            <FontAwesomeIcon icon= {faCheck} color="green" size='2x' onClick={() => handleContentClick()} style={{cursor: 'pointer'}}/>
                                            <FontAwesomeIcon icon= {faXmark} color="red" size='2x' onClick={() => handleContentClick()} style={{cursor: 'pointer'}}/>    
                                        </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminRegistrationRequests;

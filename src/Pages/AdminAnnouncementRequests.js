import React from 'react';
import "../CSS/AdminAnnouncementRequests.css"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import SystemAdminSidebar from '../components/SystemAdminSidebar';

const announcements = [
    { id: 1, title: "Announcement 1", content: "Deadline: 06.05.2024" },
    { id: 2, title: "Announcement 2", content: "Deadline: 06.05.2024" },
    { id: 3, title: "Announcement 3", content: "Deadline: 06.05.2024" },
];

function AdminAnnouncementRequests() {
    const navigate = useNavigate();

    const handleActionClick = (action, id) => {
        alert(`${action} clicked for announcement ${id}`);
    };

    const handleContentClick = () => {
        // Placeholder for opening PDF
        alert('Content Clicked!');
    };

    return (
        <div className="admin-homepage">
            <SystemAdminSidebar/>
            <div className="main-content">
                <div className="header d-flex align-items-center">
                    <i className="far fa-user-circle user-icon mr-2"></i>
                    <span className="user-name">Iztech User - System Admin</span>
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
                                        <div className="announcement-text">
                                            <p className="card-text" onClick={handleContentClick} style={{cursor: 'pointer'}}>{announcement.content}</p>
                                            <FontAwesomeIcon icon= {faCheck} color="green" size='2x' onClick={() => handleContentClick()} style={{cursor: 'pointer'}}/>
                                            <FontAwesomeIcon icon= {faXmark} color="red" size='2x' onClick={() => handleContentClick()} style={{cursor: 'pointer'}}/>    
                                        </div>
                                        <div className="btn-group">
                                                <button onClick={() => handleActionClick('Feedback', announcement.id)} className="btn btn-primary mr-1">Feedback</button>
                                                <button onClick={() => handleActionClick('Ban', announcement.id)} className="btn btn-danger">Ban</button>
                                            </div>
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

export default AdminAnnouncementRequests;

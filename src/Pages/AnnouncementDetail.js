import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const announcements = [
    { id: 1, title: "Announcement 1", content: "This is the content of Announcement 1." },
    { id: 2, title: "Announcement 2", content: "This is the content of Announcement 2." },
    { id: 3, title: "Announcement 3", content: "This is the content of Announcement 3." },
];

function AnnouncementDetail() {
    let { id } = useParams();
    let navigate = useNavigate();
    const announcement = announcements.find(a => a.id.toString() === id);

    return (
        <div className="announcement-detail">
            <div className="header">
                <button className="back-button">&#8592; Back</button>
                <h1>{announcement.title}</h1>
                <div className="user-info">
                    <i className="far fa-user-circle user-icon"></i>
                    <div>
                        <div>Name Surname</div>
                        <div className="role">System Admin</div>
                    </div>
                </div>
            </div>
            <div className="announcement-content">
                <p>{announcement.content}</p>
            </div>
            <div className="actions">
                <button className="approve">Approve</button>
                <button className="feedback">Feedback</button>
                <button className="disapprove">Disapprove</button>
                <button className="ban">Ban</button>
            </div>
        </div>
    );
}

export default AnnouncementDetail;

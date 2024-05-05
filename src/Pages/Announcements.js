import React from 'react';


const announcements = [
    { id: 1, title: "Announcement 1", content: "This is the content of Announcement 1." },
    { id: 2, title: "Announcement 2", content: "This is the content of Announcement 2." },
    { id: 3, title: "Announcement 3", content: "This is the content of Announcement 3." },
];

function Announcements() {
    const handleActionClick = (action, id) => {
        alert(`${action} clicked for announcement ${id}`);
    };

    const handleContentClick = () => {
        // Placeholder for opening PDF
        alert('Content Clicked!');
    };

    return (
        <div className="admin-homepage">
            <div className="sidebar">
                <a href="/" class="sidebar-container">
                    <img class="sidebar-logo" src='OIMS.png'></img>
                </a>
                <button className="btn btn-light w-100 mt-2 pt-2 pb-2">Home</button>
                <button className="btn btn-light w-100 mt-2">Company Registration Requests</button>
                <button className="btn btn-light w-100 mt-2">Announcement Requests</button>
            </div>
            <div className="main-content">
                <div className="header d-flex align-items-center">
                    <i className="far fa-user-circle user-icon mr-2"></i>
                    <span className="user-name">Name Surname - System Admin</span>
                </div>
                <div className="announcements">
                    <h1>Announcement Requests</h1>
                    <div className="row">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className="col-sm-6 col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{announcement.title}</h5>
                                        <p className="card-text" onClick={handleContentClick} style={{cursor: 'pointer'}}>{announcement.content}</p>
                                        <div className="btn-group">
                                            <button onClick={() => handleActionClick('Approve', announcement.id)} className="btn btn-success mr-1">Approve</button>
                                            <button onClick={() => handleActionClick('Feedback', announcement.id)} className="btn btn-info mr-1">Feedback</button>
                                            <button onClick={() => handleActionClick('Disapprove', announcement.id)} className="btn btn-warning mr-1">Disapprove</button>
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

export default Announcements;

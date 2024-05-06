import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import "../CSS/AdminAnnouncementRequests.css";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";

function AdminAnnouncementRequests() {
  const [announcements, setAnnouncements] = useState([]);

  const handleActionClick = (action, id) => {
    alert(`${action} clicked for announcement ${id}`);
  };

  const handleContentClick = () => {
    // Placeholder for opening PDF
    alert("Content Clicked!");
  };

  useEffect(() => {
    axios.get("http://localhost:8081/announcements/list").then((response) => {
      const announcementRequests = response.data;
      setAnnouncements(
        announcementRequests.map(({ title, deadline, content }) => ({
          title,
          deadline,
          content,
        }))
      );
    });
  }, []);

  return (
    <div className="admin-annoRequest">
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
                    <div className="announcement-text">
                      <p
                        className="card-text"
                        onClick={handleContentClick}
                        style={{ cursor: "pointer" }}
                      >
                        {announcement.content}
                      </p>
                      <FontAwesomeIcon
                        icon={faCheck}
                        color="green"
                        size="2x"
                        onClick={() => handleContentClick()}
                        style={{ cursor: "pointer" }}
                      />
                      <FontAwesomeIcon
                        icon={faXmark}
                        color="red"
                        size="2x"
                        onClick={() => handleContentClick()}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <div className="btn-group">
                      <button
                        onClick={() =>
                          handleActionClick("Feedback", announcement.id)
                        }
                        className="btn btn-primary mr-1"
                      >
                        Feedback
                      </button>
                      <button
                        onClick={() =>
                          handleActionClick("Ban", announcement.id)
                        }
                        className="btn btn-danger"
                      >
                        Ban
                      </button>
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

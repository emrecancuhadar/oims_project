import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyMakeAnnouncement.css";
import CompanySidebar from "../components/CompanySidebar";
import Header from "../components/Header";
import { UserContext } from "../context/UserProvider";

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() is zero-indexed
  const day = date.getDate();

  // Pad the month and day with leading zeros if necessary
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${year}-${formattedMonth}-${formattedDay}`;
}

function CompanyMakeAnnouncement() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [deadline, setDeadline] = useState(formatDate(new Date()));
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const onSend = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("deadline", deadline);
    formData.append("companyId", user.id);

    axios
      .post("http://localhost:8081/announcements/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Announcement Created:", response.data);
        navigate("/company/my-announcements");
      })
      .catch((error) => {
        console.error("Error uploading the announcement:", error);
      });
  };

  return (
    <div className="compmakeann">
      <div className="company-homepage">
        <CompanySidebar />
        <div className="main-content">
          <div className="header d-flex align-items-center">
            <Header username={"Sample Company"} />
          </div>
          <div className="announcements-page-container row">
            <h1 className="page-title">Make Announcement</h1>
            <div className="announcements-container col-md-6">
              <div className="input-group input-group-lg">
                <div className="input-group-text">Title</div>
                <input
                  id="file-upload"
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="deadline">Deadline:</label>
                <input
                  type="date"
                  name="deadline"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="input-group input-group-lg">
                <input
                  id="file-upload"
                  type="file"
                  className="form-control"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="send-btn btn" onClick={() => onSend()}>
                Send Announcement Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyMakeAnnouncement;

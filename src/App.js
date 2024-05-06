import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminAnnouncementRequests from "./Pages/AdminAnnouncementRequests";
import CompanyHomepage from "./Pages/CompanyHomepage";
import CompanyLogin from "./Pages/CompanyLogin";
import CompanyMakeAnnouncement from "./Pages/CompanyMakeAnnouncement";
import CompanyMyAnnouncements from "./Pages/CompanyMyAnnouncements";
import CompanySignup from "./Pages/CompanySignup";
import StudentHomepage from "./Pages/StudentHomepage";
import StudentInternshipOpportunities from "./Pages/StudentInternshipOpportunities";
import StudentLoginPage from "./Pages/StudentLoginPage";
import UserSelection from "./Pages/UserSelection";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="company/login" element={<CompanyLogin />} />
          <Route path="company/signup" element={<CompanySignup />} />
          <Route path="/company/home" element={<CompanyHomepage />} />
          <Route
            path="/make-announcement"
            element={<CompanyMakeAnnouncement />}
          />
          <Route
            path="/my-announcements"
            element={<CompanyMyAnnouncements />}
          />
          <Route path="/iztech-user/login" element={<StudentLoginPage />} />
          <Route path="/student/home" element={<StudentHomepage />} />
          <Route
            path="/internship-opportunities"
            element={<StudentInternshipOpportunities />}
          />
          <Route path="/adminannouncementrequests" element={<AdminAnnouncementRequests />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

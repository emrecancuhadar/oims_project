import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminAnnouncementRequests from "./Pages/AdminAnnouncementRequests";
import AdminRegistrationRequests from "./Pages/AdminRegistrationRequests";
import CompanyHomepage from "./Pages/CompanyHomepage";
import CompanyLogin from "./Pages/CompanyLogin";
import CompanyMakeAnnouncement from "./Pages/CompanyMakeAnnouncement";
import CompanyMyAnnouncements from "./Pages/CompanyMyAnnouncements";
import CompanySignup from "./Pages/CompanySignup";
import IztechUserLoginPage from "./Pages/IztechUserLoginPage";
import StudentHomepage from "./Pages/StudentHomepage";
import StudentInternshipOpportunities from "./Pages/StudentInternshipOpportunities";
import SystemAdminHomepage from "./Pages/SystemAdminHomePage";
import UserSelection from "./Pages/UserSelection";
import ResetPassword from "./Pages/ResetPassword";
import SetNewPassword from "./Pages/SetNewPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="company/login" element={<CompanyLogin />} />
          <Route path="company/signup" element={<CompanySignup />} />
          <Route path="/company/home" element={<CompanyHomepage />} />
          <Route path="/company/resetpassword" element={<ResetPassword />} />
          <Route path="/company/setnewpassword" element={<SetNewPassword />} />
          <Route
            path="/make-announcement"
            element={<CompanyMakeAnnouncement />}
          />
          <Route
            path="/my-announcements"
            element={<CompanyMyAnnouncements />}
          />
          <Route path="/iztech-user/login" element={<IztechUserLoginPage />} />
          <Route path="/student/home" element={<StudentHomepage />} />
          <Route
            path="/internship-opportunities"
            element={<StudentInternshipOpportunities />}
          />
          <Route
            path="/admin/announcementrequests"
            element={<AdminAnnouncementRequests />}
          />
          <Route path="/admin/homepage" element={<SystemAdminHomepage />} />
          <Route
            path="/admin/registrationrequests"
            element={<AdminRegistrationRequests />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

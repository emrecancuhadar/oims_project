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
import ResetPassword from "./Pages/ResetPassword";
import SetNewPassword from "./Pages/SetNewPassword";
import StudentHomepage from "./Pages/StudentHomepage";
import StudentInternshipOpportunities from "./Pages/StudentInternshipOpportunities";
import SystemAdminHomepage from "./Pages/SystemAdminHomePage";
import UserSelection from "./Pages/UserSelection";
import CompanyMyApplicants from "./Pages/CompanyMyApplicants";
import CompanyMyInterns from "./Pages/CompanyMyInterns";
import CompanyInternshipApplications from "./Pages/CompanyInternshipApplications";
import StudentAppliedInternships from "./Pages/StudentAppliedInternships";
import StudentMyDocuments from "./Pages/StudentMyDocuments";
import SPCHomepage from "./Pages/SPCHomepage";
import SPCApplicationForms from "./Pages/SPCApplicationForms";
import DepSecHomepage from "./Pages/DepSecHomepage";
import DepSecEligibleStudents from "./Pages/DepSecEligibleStudents";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserSelection />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/signup" element={<CompanySignup />} />
          <Route path="/company/home" element={<CompanyHomepage />} />
          <Route path="/company/resetpassword" element={<ResetPassword />} />
          <Route path="/company/setnewpassword" element={<SetNewPassword />} />
          <Route
            path="/company/make-announcement"
            element={<CompanyMakeAnnouncement />}
          />
          <Route
            path="/company/my-announcements"
            element={<CompanyMyAnnouncements />}
          />
          <Route
            path="/company/internship-applications"
            element={<CompanyInternshipApplications />}
          />
          <Route
            path="/company/my-applicants"
            element={<CompanyMyApplicants />}
          />
          <Route path="/company/my-interns" element={<CompanyMyInterns />} />
          <Route path="/iztech-user/login" element={<IztechUserLoginPage />} />
          <Route path="/student/home" element={<StudentHomepage />} />
          <Route
            path="/student/internship-opportunities"
            element={<StudentInternshipOpportunities />}
          />
          <Route
            path="/student/applied-internships"
            element={<StudentAppliedInternships />}
          />
          <Route
            path="/student/my-documents"
            element={<StudentMyDocuments />}
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
          <Route path="/spc/home" element={<SPCHomepage />} />
          <Route
            path="/spc/application-forms"
            element={<SPCApplicationForms />}
          />
          <Route path="/depsec/home" element={<DepSecHomepage />} />
          <Route
            path="/depsec/eligible-students"
            element={<DepSecEligibleStudents />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

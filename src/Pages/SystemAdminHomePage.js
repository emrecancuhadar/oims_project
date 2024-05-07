import React from "react";
import "../CSS/SystemAdminHomepage.css";
import Header from "../components/Header";
import SystemAdminSidebar from "../components/SystemAdminSidebar";

function CompanyHomepage() {
  return (
    <div className="adminhome">
      <div className="admin-homepage">
        <SystemAdminSidebar />
        <div className="main-content">
          <div className="header d-flex align-items-center">
            <Header username={"System Admin"} />
          </div>
          <div className="homepage row">
            <div className="title-container">
              <h1 className="page-title">Welcome to OIMS!</h1>
            </div>
            <div className="row homepage-container">
              <div className="card">
                <div className="card-body">
                  <h2>What is OIMS?</h2>
                  <p>
                    At OIMS, we believe in fostering meaningful connections
                    between Izmir Institute of Technology (IZTECH) students and
                    companies, facilitating seamless internship opportunities
                    and accelerating career growth. Our platform serves as a
                    bridge, connecting talented students with innovative
                    companies, creating a dynamic ecosystem where aspirations
                    meet opportunities. Our mission at OIMS is clear: to
                    revolutionize the way students find internship opportunities
                    and companies discover top talent. We aim to streamline the
                    internship recruitment process, making it efficient and
                    accessible for both students and companies. By providing a
                    user-friendly platform equipped with powerful tools and
                    resources, we empower students to explore diverse internship
                    opportunities tailored to their interests and career goals.
                    Simultaneously, we empower companies to showcase their
                    projects and culture, attracting the brightest minds and
                    driving innovation forward.
                  </p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <h2>Why Choose OIMS?</h2>
                  <ul>
                    <li>
                      <strong>Tailored Internship Opportunities:</strong> Our
                      platform matches students with internship opportunities
                      based on their skills, interests, and career aspirations,
                      ensuring a personalized experience for every user.
                    </li>
                    <li>
                      <strong>Efficient Recruitment Process:</strong> Companies
                      can effortlessly publish internship listings, manage
                      applications, and communicate with candidates through our
                      intuitive interface, streamlining the recruitment process
                      and saving valuable time.
                    </li>
                    <li>
                      <strong>Comprehensive Support:</strong> From resume
                      building to interview preparation, we provide
                      comprehensive support and guidance to students throughout
                      their internship journey, equipping them with the tools
                      and resources needed to succeed.
                    </li>
                    <li>
                      <strong>Diverse Talent Pool:</strong> With a diverse pool
                      of talented students from various disciplines, companies
                      have access to a wide range of skills and perspectives,
                      fostering creativity and innovation within their teams.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyHomepage;

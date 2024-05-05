import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/CompanyHomepage.css";

function CompanyHomepage() {
  const navigate = useNavigate();
  return (
    <div className="comphome">
      <div className="company-homepage">
        <div className="sidebar">
          <a href="/" class="sidebar-container">
            <img className="sidebar-logo" src={require("../assets/images/iyte_logo.png")} alt="xd"></img>
          </a>
          <button
            onClick={() => navigate("/company/home")}
            className="btn btn-success w-100 mt-2 pt-2 pb-2"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/my-announcements")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            My Announcements
          </button>
          <button
            onClick={() => navigate("/make-announcement")}
            className="btn btn-light w-100 mt-2 pt-2 pb-2"
          >
            Make Announcement
          </button>
          <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
            Internship Applications
          </button>
          <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
            My Interns
          </button>
        </div>
        <div className="main-content">
          <div className="header d-flex align-items-center">
            <span className="user-name">Name Surname - Company</span>
            <i className="far fa-user-circle user-icon"></i>
          </div>
          <div className="homepage">
            <h1>Welcome to OIMS!</h1>
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

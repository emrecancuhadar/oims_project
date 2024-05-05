import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/StudentHomepage.css";

function StudentHomepage() {
  const navigate = useNavigate();

  return (
    <div className="student-homepage">
      <div className="sidebar">
        <a href="/" className="sidebar-container">
          <img className="sidebar-logo" src={require("../assets/images/iyte_logo.png")}></img>
        </a>
        <button
          onClick={() => navigate("/student/home")}
          className="btn btn-success w-100 mt-2 pt-2 pb-2"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/internship-opportunities")}
          className="btn btn-light w-100 mt-2 pt-2 pb-2"
        >
          Internship Opportunities
        </button>
        <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
          Applied Internships
        </button>
        <button className="btn btn-light w-100 mt-2 pt-2 pb-2">
          My Documents
        </button>
      </div>
      <div className="maincontent">
        <div className="header d-flex align-items-center">
          <span className="username">Name Surname - Student</span>
          <i className="far fa-user-circle user-icon"></i>
        </div>
        <div className="home-page">
          <h1>Welcome to OIMS!</h1>
          <div className="row homepage-container">
            <div className="card">
              <div className="card-body">
                <h2>What is OIMS?</h2>
                <p>
                  At OIMS, we believe in fostering meaningful connections
                  between Izmir Institute of Technology (IZTECH) students and
                  companies, facilitating seamless internship opportunities and
                  accelerating career growth. Our platform serves as a bridge,
                  connecting talented students with innovative companies,
                  creating a dynamic ecosystem where aspirations meet
                  opportunities. Our mission at OIMS is clear: to revolutionize
                  the way students find internship opportunities and companies
                  discover top talent. We aim to streamline the internship
                  recruitment process, making it efficient and accessible for
                  both students and companies. By providing a user-friendly
                  platform equipped with powerful tools and resources, we
                  empower students to explore diverse internship opportunities
                  tailored to their interests and career goals. Simultaneously,
                  we empower companies to showcase their projects and culture,
                  attracting the brightest minds and driving innovation forward.
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
                    <strong>Comprehensive Support:</strong> From resume building
                    to interview preparation, we provide comprehensive support
                    and guidance to students throughout their internship
                    journey, equipping them with the tools and resources needed
                    to succeed.
                  </li>
                  <li>
                    <strong>Diverse Talent Pool:</strong> With a diverse pool of
                    talented students from various disciplines, companies have
                    access to a wide range of skills and perspectives, fostering
                    creativity and innovation within their teams.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentHomepage;

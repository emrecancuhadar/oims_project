import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import mime from "mime";
import React, { useContext, useState } from "react";
import styles from "../CSS/StudentMyDocuments.module.css";
import Header from "../components/Header";
import Popup from "../components/Popup";
import StudentSidebar from "../components/StudentSidebar";
import { UserContext } from "../context/UserProvider";

function StudentMyDocuments() {
  const { user } = useContext(UserContext);
  const [noSSIPopupOpen, setNoSSIPopupOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    applicationletter: true,
    applicationform: true,
    employmentcertificate: true,
  });

  const documents = [
    { id: 1, title: user.name + " Application Form" },
    { id: 2, title: user.name + " Application Letter" },
    { id: 3, title: user.name + " Employment Certificate" },
  ];

  const formatKey = (key) => {
    return key.toLowerCase().replace(" ", "");
  };

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDownload = (fileName, response) => {
    const contentType = response.headers["content-type"];
    const fileExtension = mime.getExtension(contentType) || "bin";
    fileName += `.${fileExtension}`;

    // Create a URL for the Blob and trigger a download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName); // You can set a default filename here
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadDocument = (event, docTitle) => {
    event.stopPropagation();

    let docType = "";
    if (docTitle.includes("Application Letter")) {
      docType = "APPLICATION_LETTER_TEMPLATE";
    } else if (docTitle.includes("Application Form")) {
      docType = "APPLICATION_FORM_TEMPLATE";
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/documents/fill-download`, {
        params: {
          studentId: user.id,
          documentType: docType,
        },
        responseType: "blob", // This is important for file downloads
      })
      .then((response) => {
        handleDownload(docTitle, response);
      })
      .catch((error) => console.log(error));
  };

  const handleDownloadSSI = (event) => {
    console.log("handle");
    event.stopPropagation();
    axios
      .get(`${process.env.REACT_APP_API_URL}/students/${user.id}/ssi`, {
        responseType: "blob",
      })
      .then((response) => {
        let fileName = "SSI Certificate";
        handleDownload(fileName, response);
      })
      .catch((error) => setNoSSIPopupOpen(true));
  };

  return (
    <div className={styles.myDocuments}>
      <StudentSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div>
          <div className={styles.titleContainer}>
            <h1>My Documents</h1>
          </div>
          {[
            "Application Letter",
            "Application Form",
            "Employment Certificate",
          ].map((section) => (
            <div key={section}>
              <div className={styles.sectionHeader}>
                <button
                  onClick={() => toggleSection(formatKey(section))}
                  className={styles.toggleButton}
                >
                  {visibleSections[formatKey(section)] ? "▼" : "►"} {section}
                </button>
              </div>
              {visibleSections[formatKey(section)] && (
                <div className={styles.documentsContainer}>
                  {documents
                    .filter((doc) => doc.title.includes(section))
                    .map((doc) => (
                      <div key={doc.id} className={styles.documents}>
                        {doc.title}
                        <FontAwesomeIcon
                          icon={faDownload}
                          color="black"
                          style={{ marginLeft: "5px" }}
                          size="lg"
                          onClick={(event) =>
                            doc.title.includes("Employment Certificate")
                              ? handleDownloadSSI(event)
                              : handleDownloadDocument(event, doc.title)
                          }
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {noSSIPopupOpen && (
        <Popup
          content={"No SSI certificate is available for you."}
          isOpen={noSSIPopupOpen}
          setIsOpen={setNoSSIPopupOpen}
        />
      )}
    </div>
  );
}

export default StudentMyDocuments;

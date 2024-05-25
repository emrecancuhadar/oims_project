import React from "react";
import styles from "./internship-opportunity.module.css";

function InternshipOpportunity({ announcement, onApply }) {
  const showAnnouncement = () => {
    const documentBase64 = announcement.content;

    if (!documentBase64) {
      console.error("Document base64 data is missing");
      return;
    }

    // Decode the Base64 string to binary
    const binaryString = window.atob(documentBase64);
    const len = binaryString.length;
    console.log(binaryString);
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the binary data
    const pdfBlob = new Blob([bytes], { type: "application/pdf" });

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new browser tab
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={styles.card} onClick={showAnnouncement}>
      <div className={styles.content}>
        <h2>{announcement.companyName}</h2>
        <div>
          <p>
            <strong>Position:</strong> {announcement.title}
          </p>
          <p>
            <strong>Mail:</strong> {announcement.email}
          </p>
          <p>
            <strong>Deadline:</strong> {announcement.deadline}
          </p>
        </div>
        <button
          className={styles.applyBtn}
          onClick={(event) => {
            event.stopPropagation();
            onApply(announcement.id);
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default InternshipOpportunity;

import React from "react";
import styles from "../CompanyAnnouncement/company-announcement.module.css";

function CompanyAnnouncement({ announcement }) {
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

    console.log(bytes);

    // Create a Blob from the binary data
    const pdfBlob = new Blob([bytes], { type: "application/pdf" });

    // Generate a URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new browser tab
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className={styles.card} onClick={() => showAnnouncement()}>
        <div class={styles.announcentmentUpperDiv}>
          <div>
            <h2>{announcement.title}</h2>
          </div>
          <div class={styles.announcementAltText}>
            <div class={styles.announcementAltTextInfo}>
              Deadline:
              <p>{announcement.deadline}</p>
            </div>
            <div class={styles.announcementAltTextInfo}>
              Status:
              <p>{announcement.status}</p>
            </div>
            
          </div>
          
        </div>
        <div className={styles.buttons}>
          <button className={styles.feedbackBtn}>Edit</button>
          <button className={styles.banBtn}>Delete</button>
        </div>
      </div>
  );
}

export default CompanyAnnouncement;

import React, { useState } from "react";
import styles from "./status-filter-accordion.module.css";

function StatusFilterAccordion({ data, ItemComponent }) {
  const [visibleSections, setVisibleSections] = useState({
    accepted: true,
    pending: true,
    rejected: true,
  });

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div style={{ width: "100%" }}>
      {["ACCEPTED", "PENDING", "REJECTED"].map((section) => (
        <div key={section}>
          <div className={styles.sectionHeader}>
            <button
              onClick={() => toggleSection(section)}
              className={styles.toggleButton}
            >
              {visibleSections[section] ? "▼" : "►"}{" "}
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </div>
          {visibleSections[section] && (
            <div className={styles.sectionContainer}>
              {data
                .filter((item) => item.status === section)
                .map((item, index) => (
                  <ItemComponent key={index} item={item} />
                  // <InternCard key={index} student={intern} />
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default StatusFilterAccordion;

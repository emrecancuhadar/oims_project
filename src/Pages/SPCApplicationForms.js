import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../CSS/SPCApplicationForms.module.css";
import ApplicationFormRequest from "../components/ApplicationFormRequest";
import Header from "../components/Header";
import Popup from "../components/Popup";
import SPCSidebar from "../components/SPCSideBar";
import { UserContext } from "../context/UserProvider";

function SPCApplicationForms() {
  const [applicationFormRequests, setApplicationFormRequests] = useState([]);
  const { user } = useContext(UserContext);
  const [isApprovePopupOpen, setApprovePopupOpen] = useState(false);
  const [isDisapprovePopupOpen, setDisapprovePopupOpen] = useState(false);

  useEffect(() => {
    fetchApplicationForms();
  }, []);

  const fetchApplicationForms = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/spc/application-forms`)
      .then((response) => {
        const data = response.data;
        setApplicationFormRequests(
          data.map(
            ({
              applicationId,
              student: { fullName, email },
              company: { id: companyId },
              applicationForm: { documentId, content, contentType },
            }) => ({
              id: documentId,
              owner: fullName,
              email,
              content,
              contentType,
              companyId,
            })
          )
        );
      });
  };

  const approveApplicationFormRequest = (id, email, eligibility) => {
    const formData = new FormData();
    formData.append("studentEmail", email);
    formData.append("isEligible", eligibility);
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/spc/document/${id}/approve`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then((response) => {
        console.log(response);
        setApprovePopupOpen(true);
        setApplicationFormRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  const disapproveApplicationFormRequest = (id) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/spc/document/${id}/disapprove`)
      .then((response) => {
        setDisapprovePopupOpen(true);
        console.log(response);
        setApplicationFormRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.spcApplicationFormRequest}>
      <SPCSidebar />
      <div className={styles.mainContent}>
        <Header username={user.name} />
        <div className={styles.applicationForms}>
          <h1 className={styles.pageTitle}>
            Summer Practice Application Forms
          </h1>
          <div className={styles.applicationFormsContainer}>
            {applicationFormRequests.map((applicationFormRequest, id) => (
              <ApplicationFormRequest
                key={id}
                applicationFormRequest={applicationFormRequest}
                onApprove={approveApplicationFormRequest}
                onDisapprove={disapproveApplicationFormRequest}
              />
            ))}
          </div>
        </div>
      </div>
      {isApprovePopupOpen && (
        <Popup
          content={"Application form is approved"}
          isOpen={isApprovePopupOpen}
          setIsOpen={setApprovePopupOpen}
        />
      )}
      {isDisapprovePopupOpen && (
        <Popup
          content={"Application form is disapproved"}
          isOpen={isDisapprovePopupOpen}
          setIsOpen={setDisapprovePopupOpen}
        />
      )}
    </div>
  );
}

export default SPCApplicationForms;
